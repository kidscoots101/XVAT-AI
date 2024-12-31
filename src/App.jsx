import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SingleFileUploader from "./components/SingleFileUploader";
import "./App.css";

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      navigate("/uploader");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to xvat AI</h2>
        <p className="login-subtitle">Sign in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Forgot your password? <a href="#">Reset it</a>
        </p>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const styles = {
    home: {
      padding: "40px 20px",
      backgroundColor: "#f4f7fc",
      minHeight: "100vh",
    },
    text: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
      textAlign: "center",
      color: "#333",
      textTransform: "uppercase",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      padding: "25px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      border: "1px solid #e5e5e5",
    },
    cardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#444",
      letterSpacing: "0.5px",
    },
    cardContent: {
      fontSize: "16px",
      color: "#666",
      lineHeight: "1.6",
    },
    footer: {
      marginTop: "60px",
      textAlign: "center",
      fontSize: "14px",
      color: "#aaa",
    },
  };

  return (
    <section className="home">
      <div style={styles.text}>Dashboard</div>
      <div style={styles.container}>
        <div style={styles.card} className="card">
          <div style={styles.cardTitle}>Statistics</div>
          <div style={styles.cardContent}>Placeholder for charts or data</div>
        </div>
        <div style={styles.card} className="card">
          <div style={styles.cardTitle}>Recent Activities</div>
          <div style={styles.cardContent}>Placeholder for activity list</div>
        </div>
        <div style={styles.card} className="card">
          <div style={styles.cardTitle}>Quick Actions</div>
          <div style={styles.cardContent}>Placeholder for action buttons</div>
        </div>
      </div>
      <footer style={styles.footer}>
        &copy; 2024 XVAT AI, Inc. All rights reserved.
      </footer>
    </section>
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
