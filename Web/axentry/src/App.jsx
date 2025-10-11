import './App.css'

function App() {
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

            <button className="generate-btn">
              <span className="btn-icon">⚡</span>
              Generate OTP
            </button>
          </div>

          <div className="otp-display">
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
          </div>

          <div className="action-buttons">
            <button className="secondary-btn">
              <span className="btn-icon">📋</span>
              Copy OTP
            </button>
            <button className="secondary-btn">
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
