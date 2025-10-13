import './App.css'
import { useState } from 'react'

function App() {
  const [otp, setOtp] = useState('')
  const [isOtpGenerated, setIsOtpGenerated] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const generateOTP = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setOtp(newOtp)
    setIsOtpGenerated(true)
    setTimeLeft(300) // 5 minutes 
    
    // countdown 
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsOtpGenerated(false)
          setOtp('')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const copyOTP = async () => {
    try {
      await navigator.clipboard.writeText(otp)
      alert('OTP copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy OTP:', err)
      alert('Failed to copy OTP')
    }
  }

  // time format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  return (
    <div className="app">
      <div className="mobile-frame">
        <div className="container">
        <div className="otp-header">
          <div className="logo-section">
            <div className="logo-icon">🔐</div>
            <h1>Axentry</h1>
            <p className="tagline">Secure Authentication</p>
          </div>
        </div>

        <div className="otp-card">
          <div className="card-header">
            <h2>Generate OTP</h2>
            <p className="card-description">
              Create a one-time password for secure access
            </p>
          </div>

          <div className="otp-form">
            <div className="otp-info">
              <p className="otp-specs">
                <span className="spec-item">🔢 6-digit code</span>
                <span className="spec-item">⏰ Valid for 5 minutes</span>
              </p>
            </div>

            <button className="generate-btn" onClick={generateOTP}>
              <span className="btn-icon">⚡</span>
              Generate OTP
            </button>
          </div>

          <div className="otp-display">
            {isOtpGenerated ? (
              <div className="otp-generated">
                <div className="otp-number">{otp}</div>
                <p className="otp-timer">⏰ Expires in: {formatTime(timeLeft)}</p>
              </div>
            ) : (
              <div className="otp-placeholder">
                <div className="otp-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <p className="otp-text">Your OTP will appear here</p>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button 
              className="secondary-btn" 
              onClick={copyOTP}
              disabled={!isOtpGenerated}
            >
              <span className="btn-icon">📋</span>
              Copy OTP
            </button>
            <button className="secondary-btn" disabled>
              <span className="btn-icon">📧</span>
              Send via Email
            </button>
          </div>
        </div>

        <div className="security-info">
          <div className="info-card">
            <div className="info-icon">🛡️</div>
            <div className="info-content">
              <h3>Security Features</h3>
              <ul>
                <li>Time-limited codes</li>
                <li>Single-use tokens</li>
                <li>Secure encryption</li>
              </ul>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <div className="info-content">
              <h3>Best Practices</h3>
              <ul>
                <li>Don't share your OTP</li>
                <li>Use within time limit</li>
                <li>Keep it confidential</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
