#include <Wire.h>
#include <SPI.h>
#include <Servo.h>
#include <WiFiS3.h>
#include <Keypad_I2C.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>
#include <MFRC522.h>

// --------------------- CONFIG ---------------------
const char* WIFI_SSID = "Rew";
const char* WIFI_PASS = "rewrewrew";

const char* API_HOST = "172.20.10.6"; // <- IP เครื่อง backend
const uint16_t API_PORT = 3001;
const char* API_GET_CURRENT = "/api/otp/current";
const char* API_POST_VALIDATE = "/api/otp/validate";

// I2C addresses
const byte LCD_ADDR = 0x27;
const byte KEYPAD_I2C_ADDR = 0x20;

// RC522 pins
const uint8_t RST_PIN = 8;
const uint8_t SS_PIN  = 10;

// Servo pin
const uint8_t SERVO_PIN = 3;

// Keypad layout
const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {0,1,2,3};
byte colPins[COLS] = {4,5,6,7};

Keypad_I2C keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS, KEYPAD_I2C_ADDR);
LiquidCrystal_I2C lcd(LCD_ADDR, 20, 4);
MFRC522 mfrc522(SS_PIN, RST_PIN);
Servo doorServo;

// RFID authorized UIDs
const char* authorizedUIDs[] = {
  "11 05 04 AA",
  "E3 B5 B1 01"
};
const int NUM_AUTH = sizeof(authorizedUIDs) / sizeof(authorizedUIDs[0]);

// ------------------ STATE --------------------
String fetchedOTP = "";
unsigned long otpExpiresAt = 0;
unsigned long lastPoll = 0;
const unsigned long POLL_INTERVAL = 5000;
String inputBuffer = "";
bool doorOpen = false;
unsigned long doorOpenedAt = 0;
const unsigned long DOOR_OPEN_DURATION = 5000;

WiFiClient client;

// ------------------ HELPERS ------------------
void connectWiFi() {
  Serial.print("Connecting to WiFi ");
  Serial.print(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 20000) {
    delay(250);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected. IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWiFi connect failed");
  }
}

String httpGET(const char* host, uint16_t port, const char* path) {
  if (!client.connect(host, port)) {
    Serial.println("Connection to host failed");
    return "";
  }
  client.print(String("GET ") + path + " HTTP/1.1\r\n");
  client.print(String("Host: ") + host + "\r\n");
  client.print("Connection: close\r\n\r\n");

  String response;
  unsigned long timeout = millis() + 5000;
  while (millis() < timeout) {
    while (client.available()) {
      response += char(client.read());
    }
    if (!client.connected()) break;
  }
  client.stop();

  int idx = response.indexOf('{');
  if (idx >= 0) {
    return response.substring(idx);
  }
  return "";
}

String httpPOST(const char* host, uint16_t port, const char* path, const String& jsonBody) {
  if (!client.connect(host, port)) {
    Serial.println("Connection to host failed (POST)");
    return "";
  }
  String req = String("POST ") + path + " HTTP/1.1\r\n";
  req += String("Host: ") + host + "\r\n";
  req += "Content-Type: application/json\r\n";
  req += "Connection: close\r\n";
  req += String("Content-Length: ") + String(jsonBody.length()) + "\r\n\r\n";
  req += jsonBody;

  client.print(req);

  String response;
  unsigned long t = millis() + 5000;
  while (millis() < t) {
    while (client.available()) {
      response += char(client.read());
    }
    if (!client.connected()) break;
  }
  client.stop();

  int idx = response.indexOf('{');
  if (idx >= 0) {
    return response.substring(idx);
  }
  return "";
}

String jsonGetString(const String& json, const String& key) {
  String pattern = "\"" + key + "\"";
  int p = json.indexOf(pattern);
  if (p < 0) return "";
  int colon = json.indexOf(':', p);
  if (colon < 0) return "";
  int firstQuote = json.indexOf('"', colon + 1);
  if (firstQuote < 0) return "";
  int secondQuote = json.indexOf('"', firstQuote + 1);
  if (secondQuote < 0) return "";
  return json.substring(firstQuote + 1, secondQuote);
}

long jsonGetLong(const String& json, const String& key) {
  String pattern = "\"" + key + "\"";
  int p = json.indexOf(pattern);
  if (p < 0) return 0;
  int colon = json.indexOf(':', p);
  if (colon < 0) return 0;
  int start = colon + 1;
  while (start < json.length() && (json[start] == ' ' || json[start] == '\"')) start++;
  int end = start;
  while (end < json.length() && (isDigit(json[end]) || json[end] == '.')) end++;
  String num = json.substring(start, end);
  return num.toInt();
}

bool checkAuthorizedUID(String uid) {
  for (int i = 0; i < NUM_AUTH; i++) {
    if (uid.equalsIgnoreCase(String(authorizedUIDs[i]))) {
      Serial.println("UID matched whitelist: " + uid);
      return true;
    }
  }
  Serial.println("UID not found in whitelist: " + uid);
  return false;
}

String uidToString(MFRC522::Uid uid) {
  String s = "";
  for (byte i = 0; i < uid.size; i++) {
    if (uid.uidByte[i] < 0x10) s += "0";
    s += String(uid.uidByte[i], HEX);
    if (i < uid.size - 1) s += " ";
  }
  s.toUpperCase();
  return s;
}

void openDoorAction() {
  Serial.println("Door opening... (servo -> 180)");
  doorServo.write(180);
  doorOpen = true;
  doorOpenedAt = millis();
  lcd.clear();
  lcd.setCursor(0,1);
  lcd.print("    PASS");
  Serial.println("Door opened.");
}

// ------------------ SETUP -------------------
void setup() {
  Serial.begin(9600);
  
  while (!Serial && millis() < 3000);
  Wire.begin();
  keypad.begin();
  keypad.setDebounceTime(50);

  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Axentry initializing");

  connectWiFi();

  SPI.begin();
  mfrc522.PCD_Init();

  doorServo.attach(SERVO_PIN);
  doorServo.write(0);

  delay(500);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Ready");
  lcd.setCursor(0,1);
  lcd.print("Enter OTP or Scan");
}

// ------------------ LOOP --------------------
void loop() {
  // Poll OTP
  if (millis() - lastPoll > POLL_INTERVAL) {
    lastPoll = millis();
    if (WiFi.status() != WL_CONNECTED) {
      connectWiFi();
    } else {
      String resp = httpGET(API_HOST, API_PORT, API_GET_CURRENT);
      if (resp.length() > 0) {
        if (resp.indexOf("\"success\":true") >= 0) {
          String got = jsonGetString(resp, "otp");
          if (got.length() == 6) {
            fetchedOTP = got;
            long expiresIn = jsonGetLong(resp, "expiresIn");
            if (expiresIn > 0) otpExpiresAt = millis() + expiresIn * 1000;
            Serial.println("Fetched OTP: " + fetchedOTP);
          }
        }
      }
    }
  }

  // RFID
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    String uid = uidToString(mfrc522.uid);
    Serial.println("Card UID: " + uid);
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Card:");
    lcd.setCursor(0,1);
    lcd.print(uid);
    if (checkAuthorizedUID(uid)) {
      lcd.setCursor(0,2);
      lcd.print("Authorized");
      openDoorAction();
    } else {
      lcd.setCursor(0,2);
      lcd.print("Not authorized");
      delay(1200);
      lcd.clear();
    }
    mfrc522.PICC_HaltA();
  }

// keypad handling
char k = keypad.getKey();
if (k) {
  Serial.print("Key: "); Serial.println(k);

  if (k == '*') {
    if (inputBuffer.length() > 0) inputBuffer.remove(inputBuffer.length() - 1);
  } 
  else if (k == '#') {
    if (inputBuffer.length() == 6) {
      bool okLocal = (inputBuffer == fetchedOTP && fetchedOTP.length() == 6 && (otpExpiresAt == 0 || millis() < otpExpiresAt));
      String body = String("{\"otp\":\"") + inputBuffer + "\"}";
      String resp = httpPOST(API_HOST, API_PORT, API_POST_VALIDATE, body);
      bool okServer = false;
      if (resp.length() > 0) {
        String validStr = jsonGetString(resp, "valid");
        if (validStr == "true" || resp.indexOf("\"valid\":true") >= 0) okServer = true;
      }

      if (okLocal || okServer) {
        lcd.clear();
        lcd.setCursor(0,0);
        lcd.print("Code accepted");
        openDoorAction();
      } else {
        lcd.clear();
        lcd.setCursor(0,0);
        lcd.print("Incorrect");
        lcd.setCursor(0,1);
        lcd.print("Try again");
        Serial.println("OTP wrong");
        delay(1200);
        lcd.clear();
      }
    } else {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Enter 6 digits");
      delay(800);
      lcd.clear();
    }

    inputBuffer = "";
    lcd.setCursor(0,2);
    lcd.print("OTP:              ");
  } 
  else if (isDigit(k)) {
    if (inputBuffer.length() < 6) {
      inputBuffer += k;
    }
  }

  lcd.setCursor(0,0);
  lcd.print("Enter OTP:");
  lcd.setCursor(0,1);
  String masked = "";
  // for (unsigned int i = 0; i < inputBuffer.length(); i++) masked += "*";
  // lcd.print(masked + "      ");
  lcd.setCursor(0,2);
  lcd.print("OTP: " + inputBuffer + "      ");
}

  // Auto-close door
  if (doorOpen && millis() - doorOpenedAt > DOOR_OPEN_DURATION) {
    doorServo.write(0);
    doorOpen = false;
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Ready");
    lcd.setCursor(0,1);
    lcd.print("Enter OTP or Scan");
  }

  delay(10);
}
