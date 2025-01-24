import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SingleFileUploader from "./components/SingleFileUploader";
import Progress from "./Progress";
import Quiz from "./Quiz";
import "./App.css";
import img from './components/login_image.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
      <header>
        <div className="image-text">
          <div className="logo-text">
            <span className="name2">X</span>
            <span className="name">VAT</span>
            <span className="profession">.AI</span>
          </div>
        </div>
        <i
          className="bx bx-chevron-right toggle"
          onClick={handleSidebarToggle}
        ></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/dashboard">
                <i className="bx bxs-grid-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/progress">
                <i className="bx bx-bar-chart icon"></i>
                <span className="text nav-text">Progress</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/quiz">
                <i className="bx bx-message-alt-edit icon"></i>
                <span className="text nav-text">Quiz</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/upload">
                <i className="bx bxs-file-pdf icon"></i>
                <span className="text nav-text">Upload</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li>
            <Link to="/">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </Link>
          </li>
          <li className="mode">
            <div className="sun-moon">
              <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'} icon`}></i>
            </div>
            <span className="mode-text text">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="toggle-switch" onClick={handleDarkModeToggle}>
              <span className={`switch ${isDarkMode ? 'switched' : ''}`}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log("Remember Me is:", !isChecked ? "Checked" : "Unchecked");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      localStorage.setItem('username', username);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">LOGIN</h2>
        <div className="subtitle">
          <p className="login-subtitle">Do not have an account?</p>
          <p className="sign-subtitle">Sign Up</p>
        </div>
        <form onSubmit={handleLogin}>
          <p className="heading">Username</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your username: "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          <p className="heading">Password</p>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me-container">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="remember-me-checkbox"
              />
              Remember Me
            </label>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="login-footer">
          Forgot your password? <a href="#">Reset it</a>
        </p>
        <div className="line-container">
          <div className="line"></div>
          <span className="text">or login with</span>
          <div className="line"></div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <div className="auth-button google">
            <i class="bx bxl-google" alt="Google Logo"/>
            <span>Google</span>
          </div>
          <div className="auth-button facebook">
            <i class="bx bxl-facebook" alt="Facebook Logo"/>
            <span>Facebook</span>
          </div>
          <div className="auth-button apple">
            <i class="bx bxl-apple" alt="Apple Logo"/>
            <span>Apple</span>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={img} alt="Person Studying Image" className="img_1"/>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [username, setUsername] = useState('Student');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      const firstWord = storedUsername.split(' ')[0];
      const capitalizedUsername = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      setUsername(capitalizedUsername);
    }
  }, []);
  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <h1>Welcome back, {username}!</h1>
          <div>
            <button className="button button-primary">New Task</button>
            <button className="button button-secondary" style={{ marginLeft: "10px" }}>
              Add to Calendar
            </button>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card stat-card1">
            <div className="stat-title">Upcoming Deadlines</div>
            <div className="stat-value">4</div>
            <div>Next: Math Assignment (2 days)</div>
          </div>
          <div className="stat-card stat-card2">
            <div className="stat-title">Study Hours</div>
            <div className="stat-value">50</div>
            <div>+5 from last week</div>
          </div>
          <div className="stat-card stat-card3">
            <div className="stat-title">Monthly Budget</div>
            <div className="stat-value">$1200</div>
            <div>$300 remaining</div>
          </div>
          <div className="stat-card stat-card4">
            <div className="stat-title">Study Streak</div>
            <div className="stat-value">7 days</div>
            <div>Keep it up!</div>
          </div>
        </div>
        <div className="assignments">
          <h2>Current Assignments</h2>
          <div className="assignment-card">
            <div>Physics Lab Report</div>
            <div>Due Tomorrow: 11:59 PM</div>
          </div>
          <div className="assignment-card">
            <div>Economics Presentation</div>
            <div>Due in 3 days: 3:30 PM</div>
          </div>
        </div>
        <div className="analytics">
          <h2>Study Analytics</h2>
          <p>[Interactive Chart Here]</p>
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => (
  <div className="App">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/upload" element={<SingleFileUploader />} />
    </Routes>
  </div>
);

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
  );
}
