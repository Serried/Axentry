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
                  <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="resource-btn website-btn">
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
