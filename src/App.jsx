import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SingleFileUploader from "./components/SingleFileUploader";
// import Sidebar from "./components/Sidebar";
import "./App.css";

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
const Dashboard = () => (
  <section className="home">
    <div className="text">Dashboard</div>
  </section>
);

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

const Logout = () => (
  <section className="home">
    <div className="text">Logout</div>
  </section>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/uploader" element={<SingleFileUploader />} />
      {/* <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/upload" element={<SingleFileUploader />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
       */}
    </Routes>
  );
}
