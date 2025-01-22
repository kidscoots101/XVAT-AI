import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SingleFileUploader from "./components/SingleFileUploader";
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
        <div className="imagetext">
          <span className="comp_title">XVAT</span>
        </div>
        <i
          className="bx bx-chevron-right toggle"
          onClick={handleSidebarToggle}
        ></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input
              type="search"
              placeholder="Search..."
              style={{ color: "black" }}
            />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/dashboard">
                <i className="bx bxs-grid-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
              <span className="tooltip">Dashboard</span>
            </li>
            <li className="nav-link">
              <Link to="/subjects">
                <i className="bx bxs-bookmarks icon"></i>
                <span className="text nav-text">Subjects</span>
              </Link>
              <span className="tooltip">Subjects</span>
            </li>
            <li className="nav-link">
              <Link to="/progress">
                <i className="bx bx-bar-chart icon"></i>
                <span className="text nav-text">Progress</span>
              </Link>
              <span className="tooltip">Progress</span>
            </li>
            <li className="nav-link">
              <Link to="/quiz">
                <i className="bx bx-message-alt-edit icon"></i>
                <span className="text nav-text">Quiz</span>
              </Link>
              <span className="tooltip">Quiz</span>
            </li>
            <li className="nav-link">
              <Link to="/upload">
                <i className="bx bxs-file-pdf icon"></i>
                <span className="text nav-text">Upload</span>
              </Link>
              <span className="tooltip">Upload</span>
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
            <div className="moon-sun">
              {isDarkMode ? (
                <i className="bx bx-sun icon"></i>
              ) : (
                <i className="bx bx-moon icon"></i>
              )}
            </div>
            <span className="mode-text text">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="toggle-switch" onClick={handleDarkModeToggle}>
              <span className="switch"></span>
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
  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <h1>Welcome back, Student!</h1>
          <div>
            <button className="button button-primary">New Task</button>
            <button className="button button-secondary" style={{ marginLeft: "10px" }}>
              Add to Calendar
            </button>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card1">
            <div className="stat-title">Upcoming Deadlines</div>
            <div className="stat-value">4</div>
            <div>Next: Math Assignment (2 days)</div>
          </div>
          <div className="stat-card2">
            <div className="stat-title">Study Hours</div>
            <div className="stat-value">50</div>
            <div>+5 from last week</div>
          </div>
          <div className="stat-card3">
            <div className="stat-title">Monthly Budget</div>
            <div className="stat-value">$1200</div>
            <div>$300 remaining</div>
          </div>
          <div className="stat-card4">
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


const Subjects = () => (
  <section className="home">
    <div className="text">Subjects</div>
  </section>
);

const Progress = () => (
  <section className="home">
    <div className="text">Progress</div>
  </section>
);

const Quiz = () => (
  <section className="home">
    <div className="text">Quiz</div>
  </section>
);

const AppLayout = () => (
  <>
    <Sidebar />
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/upload" element={<SingleFileUploader />} />
    </Routes>
  </>
);

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
  );
}
