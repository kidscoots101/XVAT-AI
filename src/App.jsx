import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SingleFileUploader from "./components/SingleFileUploader";
import Quiz from "./components/Quiz";
import Profile from "./components/profile"; // Import the Profile component
import "./App.css";
import Login from './components/login';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'; // Import recharts components

const Sidebar = () => {
  const [username, setUsername] = useState('Student');
  const [profilePic, setProfilePic] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({ name: "Math Assignment", dueDate: "2 days" });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfilePic = localStorage.getItem('profilePic');
  
    if (storedUsername) {
      const firstWord = storedUsername.split(' ')[0];
      const capitalizedUsername = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      setUsername(capitalizedUsername);
    }
  
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);
  
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const handleNewTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTaskSubmit = (taskName, dueDate) => {
    const selectedDate = new Date(dueDate);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      alert("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }

    setTask({ name: taskName, dueDate: dueDate });
    setIsModalOpen(false);
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
      <div className="menu-bar">
        <header>
          <div className="logo-text">
            <p className="name2">X<span className="name">VAT</span><span className="profession">.AI</span></p>
          </div>
          <i
            className="bx bx-chevron-right toggle"
            onClick={handleSidebarToggle}
          ></i>
        </header>
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/dashboard">
                <i className="bx bxs-grid-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
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
          <li className="profile">
            <Link to="/profile" className="profile-link">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-pic" />
              ) : (
                <i className="bx bxs-user-circle profile-icon"></i>
              )}
              {isSidebarOpen ? (
                <div className="profile-details">
                  <span className="profile-name">{username}</span>
                  <span className="profile-role">Student at SST</span>
                </div>
              ) : null}
            </Link>
          </li>
          <li>
            <Link className="logout-container" to="/">
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

const Dashboard = () => {
  const [username, setUsername] = useState('Student');
  const [assignments, setAssignments] = useState([
    { name: "Physics Lab Report", due: "Due Tomorrow: 11:59 PM" },
    { name: "Economics Presentation", due: "Due in 3 days: 3:30 PM" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      const firstWord = storedUsername.split(' ')[0];
      const capitalizedUsername = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      setUsername(capitalizedUsername);
    }
  }, []);

  const handleNewTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskName("");
    setDueDate("");
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskName && dueDate) {
      const newAssignment = {
        name: taskName,
        due: `Due on: ${new Date(dueDate).toLocaleDateString()}`
      };
      setAssignments([...assignments, newAssignment]);
      handleModalClose();
    }
  };

  const data = [
    { name: 'Week 1', studyHours: 10 },
    { name: 'Week 2', studyHours: 15 },
    { name: 'Week 3', studyHours: 20 },
    { name: 'Week 4', studyHours: 25 },
  ];

  const pieData = [
    { name: 'Week 1', value: 10 },
    { name: 'Week 2', value: 15 },
    { name: 'Week 3', value: 20 },
    { name: 'Week 4', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <h1>Welcome back, {username}!</h1>
          <div>
            <button className="button button-primary" onClick={handleNewTaskClick}>New Task</button>
            <button className="button button-secondary" style={{ marginLeft: "10px" }}>
              Add to Calendar
            </button>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card stat-card1">
            <div className="hexagon">
              <i class='bx bxs-graduation'></i>
            </div>
            <div className="stat-title">Nigger</div>
            <div className="stat-value">4</div>
          </div>
          <div className="stat-card stat-card2">
            <div className="hexagon">
              <i class='bx bxs-book-content'></i>
            </div>
            <div className="stat-title">Nigger</div>
            <div className="stat-value">50</div>
          </div>
          <div className="stat-card stat-card3">
            <div className="hexagon">
              <i class='bx bx-time'></i>
            </div>
            <div className="stat-title">Nigger</div>
            <div className="stat-value">$1200</div>
          </div>
          <div className="stat-card stat-card4">
            <div className="hexagon">
              <i class='bx bxs-file-pdf'></i>
            </div>
            <div className="stat-title">Nigger</div>
            <div className="stat-value">7 days</div>
          </div>
        </div>
        <div className="charts">
          <div className="chart1">
            <h2>Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="studyHours" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div classname="chart2">
              <h2>Study Hours Pie Chart</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
          </div>
        </div>
        <div className="assignments">
          <h2>Current Assignments</h2>
          {assignments.map((assignment, index) => (
            <div className="assignment-card" key={index}>
              <div>{assignment.name}</div>
              <div>{assignment.due}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for New Task */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Task</h2>
            <form onSubmit={handleTaskSubmit}>
              <div className="form-group">
                <label>Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={handleModalClose}>Cancel</button>
                <button type="submit">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AppLayout = () => (
  <div className="App">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/upload" element={<SingleFileUploader />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}