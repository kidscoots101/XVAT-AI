import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
    <div className="login-page">
      <header className="nav-header">
        <div className="logo">
          <img src={logo} alt="XVAT.AI Logo" />
        </div>
        <nav>
          <a href="#home">home</a>
          <a href="#release">release notes</a>
          <a href="#about">about us</a>
          <button className="download-btn">DOWNLOAD</button>
        </nav>
      </header>
      
      <div className="login-container">
        <div className="login-card">
          <h2>LOGIN</h2>
          <p className="signup-text">
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe123"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="johndoe123"
              />
              <div className="forgot-password">
                <a href="#reset">Reset Password</a>
              </div>
            </div>
            
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                Remember Me
              </label>
            </div>
            
            <button type="submit" className="login-button">
              Login <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
