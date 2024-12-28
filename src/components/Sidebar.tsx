import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(prevState => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <header>
        <div className="imagetext">
          <span className="image">
            XVAT
          </span>
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
            <input type="search" placeholder="Search..." />
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
            <Link to="/logout">
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
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
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

export default Sidebar;