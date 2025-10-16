import './App.css'

function App() {
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

          
        </main>

        <footer className="footer">
          <p>&copy; 2025 Axentry</p>
        </footer>
      </div>
  )
}

export default App
