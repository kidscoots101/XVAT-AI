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
              <Link to="/subjects">
                <i className="bx bxs-bookmarks icon"></i>
                <span className="text nav-text">Subjects</span>
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


const Subjects = () => (
  <section className="home">
    <div className="content">
      <div className="header">
        <h1>Your Subjects</h1>
        <button className="button button-primary">Add Subject</button>
      </div>
      <div className="subjects-grid">
        <div className="subject-card">
          <div className="subject-icon mathematics">
            <i className='bx bx-math'></i>
          </div>
          <h3>Mathematics</h3>
          <p>Progress: 75%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '75%'}}></div>
          </div>
        </div>
        <div className="subject-card">
          <div className="subject-icon physics">
            <i className='bx bx-atom'></i>
          </div>
          <h3>Physics</h3>
          <p>Progress: 60%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '60%'}}></div>
          </div>
        </div>
        <div className="subject-card">
          <div className="subject-icon chemistry">
            <i className='bx bx-flask'></i>
          </div>
          <h3>Chemistry</h3>
          <p>Progress: 45%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '45%'}}></div>
          </div>
        </div>
        <div className="subject-card">
          <div className="subject-icon biology">
            <i className='bx bx-dna'></i>
          </div>
          <h3>Biology</h3>
          <p>Progress: 82%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '82%'}}></div>
          </div>
        </div>
        <div className="subject-card">
          <div className="subject-icon history">
            <i className='bx bx-book-open'></i>
          </div>
          <h3>History</h3>
          <p>Progress: 55%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '55%'}}></div>
          </div>
        </div>
        <div className="subject-card">
          <div className="subject-icon literature">
            <i className='bx bx-pen'></i>
          </div>
          <h3>Literature</h3>
          <p>Progress: 68%</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '68%'}}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Progress = () => (
  <section className="home">
    <div className="content">
      <div className="header">
        <h1>Your Progress</h1>
        <div className="progress-filters">
          <select className="progress-select">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
      <div className="progress-stats">
        <div className="progress-card">
          <h3>Study Hours</h3>
          <div className="circular-progress">
            <div className="inner-circle">
              <span>85%</span>
            </div>
          </div>
          <p>Target: 40hrs/week</p>
        </div>
        <div className="progress-card">
          <h3>Assignments</h3>
          <div className="circular-progress">
            <div className="inner-circle">
              <span>92%</span>
            </div>
          </div>
          <p>23/25 Completed</p>
        </div>
        <div className="progress-card">
          <h3>Quiz Scores</h3>
          <div className="circular-progress">
            <div className="inner-circle">
              <span>78%</span>
            </div>
          </div>
          <p>Average Score</p>
        </div>
        <div className="progress-card">
          <h3>Attendance</h3>
          <div className="circular-progress">
            <div className="inner-circle">
              <span>95%</span>
            </div>
          </div>
          <p>19/20 Classes</p>
        </div>
      </div>
    </div>
  </section>
);

const Quiz = () => (
  <section className="home">
    <div className="content">
      <div className="header">
        <h1>Available Quizzes</h1>
        <div className="quiz-filters">
          <input type="text" placeholder="Search quizzes..." className="quiz-search" />
        </div>
      </div>
      <div className="quiz-grid">
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>Mathematics</h3>
            <span className="quiz-badge">New</span>
          </div>
          <p>Chapter 5: Calculus</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 30 mins</span>
            <span><i className='bx bx-question-mark'></i> 25 questions</span>
          </div>
          <button className="quiz-button">Start Quiz</button>
        </div>
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>Physics</h3>
            <span className="quiz-badge completed">Completed</span>
          </div>
          <p>Chapter 3: Mechanics</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 45 mins</span>
            <span><i className='bx bx-question-mark'></i> 30 questions</span>
          </div>
          <button className="quiz-button">Review</button>
        </div>
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>Chemistry</h3>
            <span className="quiz-badge">New</span>
          </div>
          <p>Chapter 4: Organic Chemistry</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 40 mins</span>
            <span><i className='bx bx-question-mark'></i> 20 questions</span>
          </div>
          <button className="quiz-button">Start Quiz</button>
        </div>
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>Biology</h3>
            <span className="quiz-badge">New</span>
          </div>
          <p>Chapter 2: Cell Biology</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 35 mins</span>
            <span><i className='bx bx-question-mark'></i> 28 questions</span>
          </div>
          <button className="quiz-button">Start Quiz</button>
        </div>
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>History</h3>
            <span className="quiz-badge completed">Completed</span>
          </div>
          <p>World War II</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 50 mins</span>
            <span><i className='bx bx-question-mark'></i> 35 questions</span>
          </div>
          <button className="quiz-button">Review</button>
        </div>
        <div className="quiz-card">
          <div className="quiz-header">
            <h3>Literature</h3>
            <span className="quiz-badge">New</span>
          </div>
          <p>Shakespeare: Macbeth</p>
          <div className="quiz-meta">
            <span><i className='bx bx-time'></i> 45 mins</span>
            <span><i className='bx bx-question-mark'></i> 25 questions</span>
          </div>
          <button className="quiz-button">Start Quiz</button>
        </div>
      </div>
    </div>
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
