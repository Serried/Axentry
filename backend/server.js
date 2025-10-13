import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let currentOTP = null;
let otpExpiry = null;
let otpUsed = false;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const isOTPValid = () => {
  if (!currentOTP || otpUsed) return false;
  if (Date.now() > otpExpiry) {
    currentOTP = null;
    otpExpiry = null;
    return false;
  }
  return true;
};

// routes
app.post('/api/otp/generate', (req, res) => {
  try {
    const newOTP = generateOTP();
    currentOTP = newOTP;
    otpExpiry = Date.now() + (5 * 60 * 1000); // 5 minutes
    otpUsed = false;

    console.log(`Generated OTP: ${newOTP}, Expires: ${new Date(otpExpiry).toLocaleString()}`);

    res.json({
      success: true,
      otp: newOTP,
      expiresIn: 5 * 60, // seconds
      expiresAt: otpExpiry
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate OTP'
    });
  }
});

// get otp for arduino
app.get('/api/otp/current', (req, res) => {
  try {
    if (!isOTPValid()) {
      return res.json({
        success: false,
        message: 'No valid OTP available',
        otp: null
      });
    }

    const timeLeft = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000));

    res.json({
      success: true,
      otp: currentOTP,
      expiresIn: timeLeft,
      expiresAt: otpExpiry
    });
  } catch (error) {
    console.error('Error getting current OTP:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get current OTP'
    });
  }
});

// validate OTP for arduino
app.post('/api/otp/validate', (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp || otp.length !== 6) {
      return res.json({
        success: false,
        valid: false,
        message: 'Invalid OTP format'
      });
    }

    if (!isOTPValid()) {
      return res.json({
        success: false,
        valid: false,
        message: 'No valid OTP available or expired'
      });
    }

    if (currentOTP === otp) {
      // check if already used
      otpUsed = true;
      console.log(`OTP ${otp} validated successfully`);
      
      return res.json({
        success: true,
        valid: true,
        message: 'OTP validated successfully'
      });
    } else {
      console.log(`Invalid OTP attempt: ${otp}`);
      return res.json({
        success: true,
        valid: false,
        message: 'Invalid OTP'
      });
    }
  } catch (error) {
    console.error('Error validating OTP:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate OTP'
    });
  }
});

// debug 
app.get('/api/otp/status', (req, res) => {
  try {
    const isValid = isOTPValid();
    const timeLeft = currentOTP ? Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000)) : 0;

    res.json({
      success: true,
      hasOTP: !!currentOTP,
      isValid,
      used: otpUsed,
      timeLeft,
      expiresAt: otpExpiry
    });
  } catch (error) {
    console.error('Error getting OTP status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get OTP status'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Axentry API is running',
    timestamp: new Date().toISOString()
  });
});

// start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Axentry API Server running on port ${PORT}`);
  console.log(`Arduino can connect to: http://[YOUR_IP]:${PORT}/api/otp/current`);
  console.log(`Frontend can connect to: http://localhost:${PORT}`);
});

export default app;
