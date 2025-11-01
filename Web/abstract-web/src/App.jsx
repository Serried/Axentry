import './App.css'
import './animations.js'

function App() {
  // Trigger deployment
  return (
    <div className="app">
      <div className="hero-image-section">
        <div className="hero-image-placeholder">
          <div className="placeholder-content">
            <p className="placeholder-text">Image</p>
          </div>
        </div>
      </div>



        <main className="main">
          <div className="hero-section">
            <h1 className="hero-title">
              
              <span className="gradient-text"> Axentry</span>
            </h1>
            <p className="hero-subtitle">
            โครงงานนี้จัดทำขึ้นภายใต้รายวิชา Physical Computing (06016409) โดยมีวัตถุประสงค์เพื่อพัฒนาระบบควบคุมการเข้า-ออกหอพักที่มีความยืดหยุ่น ปลอดภัย และสะดวกต่อการใช้งานของผู้พักอาศัย ระบบถูกออกแบบมาเพื่อแก้ไขปัญหาที่พบได้บ่อย เช่น การลืม Keycard การเพิ่มภาระงานให้เจ้าหน้าที่หอพัก รวมถึงความไม่สะดวกในการรับแขกหรือผู้มาเยี่ยมระบบนี้ประกอบด้วย สองวิธีหลักในการเข้าถึงหอพัก ได้แก่
<br></br><br></br>1. การใช้ Keycard (NFC) สำหรับการเข้าออกแบบมาตรฐานทั่วไปของผู้พักอาศัย
<br></br>2. การใช้รหัส OTP ผ่านเว็บไซต์ โดยผู้พักสามารถเข้าสู่ระบบเพื่อสร้างรหัสแบบใช้ครั้งเดียว (One-Time Password) สำหรับกรณีลืม Keycard หรือใช้เพื่อมอบสิทธิ์ให้แขกเข้ามาได้ชั่วคราวโดยไม่ต้องออกมาเปิดประตูด้วยตนเอง
<br></br><br></br>โครงงานนี้ผสานเทคโนโลยีทางด้าน Physical Computing และ Web Application เข้าด้วยกัน เพื่อสร้างระบบที่ตอบโจทย์ชีวิตประจำวันในยุคดิจิทัล ช่วยลดภาระงานของเจ้าหน้าที่ และเพิ่มความสะดวก ปลอดภัย รวมถึงยกระดับประสบการณ์การพักอาศัยให้มีประสิทธิภาพมากยิ่งขึ้น


            </p>
          </div>

          {/* Main Components */}
          <div className="components-section">
            <h2 className="section-title">Main Components</h2>
            <div className="components-grid">
              <div className="component-card">
                <div className="component-image">
                  <img src={`${baseUrl}components/arduino.jpg`} alt="Arduino UNO R4 Wi-Fi" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="component-content">
                  <h3 className="component-title">Arduino UNO R4 Wi-Fi1</h3>
                  <p className="component-description">ไมโครคอนโทรลเลอร์หลัก ทำหน้าที่ควบคุมการทำงานของระบบทั้งหมด และเชื่อมต่อกับเครือข่าย Wi-Fi</p>
                </div>
              </div>
              <div className="component-card">
                <div className="component-image">
                  <img src={`${baseUrl}components/rfid-reader.jpg`} alt="RFID Reader (RC522)" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="component-content">
                  <h3 className="component-title">RFID Reader (RC522)</h3>
                  <p className="component-description">อ่านหมายเลขประจำบัตร (UID) เพื่อใช้ในการตรวจสอบสิทธิ์การเข้าออก</p>
                </div>
              </div>
              <div className="component-card">
                <div className="component-image">
                  <img src={`${baseUrl}components/keypad.jpg`} alt="Keypad 4x4 (I2C)" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="component-content">
                  <h3 className="component-title">Keypad 4x4 (I2C)</h3>
                  <p className="component-description">ใช้ป้อนรหัส OTP ที่ได้รับจากระบบเว็บไซต์</p>
                </div>
              </div>
              <div className="component-card">
                <div className="component-image">
                  <img src={`${baseUrl}components/servo.jpg`} alt="Servo Motor" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="component-content">
                  <h3 className="component-title">Servo Motor</h3>
                  <p className="component-description">ควบคุมการเปิด-ปิดของประตู</p>
                </div>
              </div>
              <div className="component-card">
                <div className="component-image">
                  <img src={`${baseUrl}components/lcd.jpg`} alt="LCD I2C Display" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="component-content">
                  <h3 className="component-title">LCD I2C Display</h3>
                  <p className="component-description">แสดงข้อความสถานะของระบบ เช่น ผลการยืนยันตัวตน <br></br>หรือสถานะการเชื่อมต่อ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operation */}
          <div className="operation-section">
            <h2 className="section-title">Operations</h2>
            <div className="operation-content">
              <div className="operation-topic">
                <h3 className="topic-title">RFID Mode</h3>
                <p className="topic-description">
                  1. ผู้ใช้แตะบัตรที่เครื่องอ่าน RFID <br></br>2. Arduino UNO R4 อ่าน UID ของบัตรและตรวจสอบกับฐานข้อมูลภายในระบบ<br></br>3. หากบัตรได้รับอนุญาต ระบบจะสั่งให้ Servo Motor หมุนเพื่อปลดล็อกประตู<br></br>4. LCD แสดงข้อความ “Pass"
                </p>
              </div>
              <div className="operation-topic">
                <h3 className="topic-title">OTP Mode</h3>
                <p className="topic-description">
                  1. ผู้ใช้เข้าสู่เว็บไซต์ Axentry เพื่อขอรหัส OTP<br></br>2. ระบบเว็บเซิร์ฟเวอร์จะสร้างรหัส 6 หลักที่มีอายุ 5 นาที<br></br>3. ผู้ใช้ป้อนรหัสผ่าน Keypad 4x4 ที่ติดตั้งไว้บริเวณประตู<br></br>4. Arduino ตรวจสอบรหัสกับ Server ผ่าน Wi-Fi<br></br>5. หากรหัสถูกต้องและไม่หมดอายุ ระบบจะปลดล็อกประตูชั่วคราว
                </p>
              </div>
              <div className="operation-topic">
                <h3 className="topic-title">Security and Reset Mechanism</h3>
                <p className="topic-description">
                  1. หลังจากปลดล็อกประตู ระบบจะรอระยะเวลาที่กำหนด (default คือ 5 วินาที) ก่อนสั่งให้ Servo หมุนกลับเพื่อล็อกประตูอีกครั้ง<br></br>2. หากรหัสหรือบัตรไม่ถูกต้อง ระบบจะไม่ทำงานและแสดง “Not Authorized” บนหน้าจอ
                </p>
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="objective-section">
            <h2 className="section-title">Objectives</h2>
            <div className="objective-content">
              <p className="objective-text">
              Project นี้ช่วยให้ผู้พักอาศัยสามารถเข้าถึงห้องพักได้อย่าง สะดวก ปลอดภัย และรวดเร็ว โดยไม่ต้องพึ่งพาคีย์การ์ดเพียงอย่างเดียว
ระบบถูกออกแบบมาเพื่อตอบโจทย์ปัญหาที่ผู้ใช้งานมักพบ เช่น การลืมบัตร การเข้าห้องลำบาก หรือการรอให้เจ้าหน้าที่มาเปิดประตู
              </p>
              <ul className="objective-list">
                <li>เพิ่มความสะดวกให้ผู้พักอาศัยสามารถเข้า–ออกห้องได้แม้ลืมคีย์การ์ด</li>
                <li>รองรับการเข้าออกด้วยรหัส OTP ผ่านเว็บไซต์เพื่อการเข้าชั่วคราวหรือให้แขกใช้งาน</li>
                <li>แสดงผลสถานะการเข้าออกผ่านหน้าจอ LCD แบบ real-time</li>
                <li>ปลดล็อกประตูโดยอัตโนมัติและกลับสู่สถานะล็อกเองภายหลังการใช้งาน (Auto-Lock Mechanism)</li>
                <li>ลดขั้นตอนและเวลาในการขอความช่วยเหลือจากเจ้าหน้าที่หอพัก</li>
                <li>ออกแบบให้ใช้งานง่าย รองรับทุกกลุ่มผู้ใช้งาน</li>
              </ul>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="outcome-section">
            <h2 className="section-title">Expected Outcomes</h2>
            <div className="outcome-content">
              <p className="outcome-text">
                เมื่อระบบ Axentry ได้รับการพัฒนาและนำไปใช้งานจริงคาดว่าจะช่วยเพิ่มประสิทธิภาพการจัดการของหอพักได้อย่างมีนัยสำคัญระบบนี้จะช่วยให้การเข้า-ออกห้องพักมีความ ปลอดภัย สะดวกสบาย และอัตโนมัติยิ่งขึ้นพร้อมทั้งลดภาระงานของเจ้าหน้าที่และเพิ่มความพึงพอใจของผู้ใช้งานโดยรวม
              </p>
              <div className="outcome-grid">
                <div className="outcome-item">
                  <h4 className="outcome-item-title">Improved Security</h4>
                  <p>ช่วยป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต พร้อมบันทึกสถานะการเข้า–ออกเพื่อใช้ตรวจสอบย้อนหลังได้</p>
                </div>
                <div className="outcome-item">
                  <h4 className="outcome-item-title">Increased Convenience</h4>
                  <p>ผู้พักสามารถเข้าห้องได้แม้ลืมบัตร โดยใช้รหัส OTP ผ่านเว็บไซต์</p>
                </div>
                <div className="outcome-item">
                  <h4 className="outcome-item-title">Reduced Administrative Workload</h4>
                  <p>ระบบอัตโนมัติช่วยลดความจำเป็นในการดำเนินงานด้วยมือของเจ้าหน้าที่ ทำให้เจ้าหน้าที่สามารถโฟกัสกับงานด้านอื่นที่สำคัญกว่าได้</p>
                </div>
                <div className="outcome-item">
                  <h4 className="outcome-item-title">Better User Experience</h4>
                  <p>ด้วยความใช้งานง่าย และการทำงานที่รวดเร็ว จะทำให้เพิ่มความพึงพอใจและความไว้วางใจต่อระบบในระยะยาว</p>
                </div>
              </div>
            </div>
          </div>

          <div className="resources-section">
            <h2 className="resources-title">Project Resources</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">
                  <span className="icon">📺</span>
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">Youtube Presentation</h3>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="resource-btn youtube-btn">
                    <span className="btn-icon">▶️</span>
                    Watch Video
                  </a>
                </div>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <span className="icon">🌐</span>
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">Project Website</h3>
                  <a href="https://axentry.vercel.app/" target="_blank" rel="noopener noreferrer" className="resource-btn website-btn">
                    <span className="btn-icon">🔗</span>
                    Visit Website
                  </a>
                </div>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <span className="icon">💻</span>
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">Source Code</h3>
                  <a href="https://github.com/Serried/Axentry" target="_blank" rel="noopener noreferrer" className="resource-btn code-btn">
                    <span className="btn-icon">📂</span>
                    View on GitHub
                  </a>
                </div>
              </div>

              <div className="resource-card">
                <div className="resource-icon">
                  <span className="icon">📄</span>
                </div>
                <div className="resource-content">
                  <h3 className="resource-title">Project Poster</h3>
                  <a href="#" className="resource-btn poster-btn">
                    <span className="btn-icon">📥</span>
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2 className="team-title">Contributors</h2>
            <div className="members-grid">
              <div className="member-card">
                <div className="member-image">
                  <img 
                    src="./team-members/member1.jpg" 
                    alt="member-1"
                    className="member-photo"
                    onLoad={() => console.log('Image 1 loaded successfully')}
                    onError={(e) => {
                      console.log('Image 1 failed to load:', e.target.src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="member-image-placeholder" style={{display: 'none'}}>
                    <span className="member-initial">1</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">นายธนกฤต อินทร์ฉ่ำ</h3>
                  <p className="member-id">รหัสนักศึกษา: 67070061</p>
                </div>
              </div>

              <div className="member-card">
                <div className="member-image">
                  <img 
                    src="./team-members/member2.jpg" 
                    alt="member-2"
                    className="member-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="member-image-placeholder" style={{display: 'none'}}>
                    <span className="member-initial">2</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">นายธิติพัทธ์ นนทเภท</h3>
                  <p className="member-id">รหัสนักศึกษา: 67070078</p>
                </div>
              </div>

              <div className="member-card">
                <div className="member-image">
                  <img 
                    src="./team-members/member3.jpg" 
                    alt="member-3"
                    className="member-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="member-image-placeholder" style={{display: 'none'}}>
                    <span className="member-initial">3</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">นายเนติ วัชรภูมิ</h3>
                  <p className="member-id">รหัสนักศึกษา: 67070093</p>
                </div>
              </div>

              <div className="member-card">
                <div className="member-image">
                  <img 
                    src="./team-members/member4.jpg" 
                    alt="member-4"
                    className="member-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="member-image-placeholder" style={{display: 'none'}}>
                    <span className="member-initial">4</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">นายรัตนกร ชุ่มภักดี</h3>
                  <p className="member-id">รหัสนักศึกษา: 67070153</p>
                </div>
              </div>
            </div>
          </div>
          
        </main>

        <footer className="footer">
          <p>&copy; 2025 Axentry</p>
        </footer>
      </div>
  )
}

export default App
