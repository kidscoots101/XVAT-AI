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


const Subjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', progress: 75, icon: 'bx-math', color: 'mathematics' },
    { id: 2, name: 'Physics', progress: 60, icon: 'bx-atom', color: 'physics' },
    { id: 3, name: 'Chemistry', progress: 45, icon: 'bx-flask', color: 'chemistry' },
    { id: 4, name: 'Biology', progress: 82, icon: 'bx-dna', color: 'biology' },
    { id: 5, name: 'History', progress: 55, icon: 'bx-book-open', color: 'history' },
    { id: 6, name: 'Literature', progress: 68, icon: 'bx-pen', color: 'literature' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', icon: 'bx-book' });

  const handleAddSubject = () => {
    if (newSubject.name) {
      setSubjects([
        ...subjects,
        {
          id: subjects.length + 1,
          name: newSubject.name,
          progress: 0,
          icon: newSubject.icon,
          color: 'new-subject'
        }
      ]);
      setShowAddModal(false);
      setNewSubject({ name: '', icon: 'bx-book' });
    }
  };

  return (
    <section className="home">
      <div className="content">
        <div className="header">
          <h1>Your Subjects</h1>
          <button className="button button-primary" onClick={() => setShowAddModal(true)}>
            Add Subject
          </button>
        </div>
        <div className="subjects-grid">
          {subjects.map(subject => (
            <div className="subject-card" key={subject.id}>
              <div className={`subject-icon ${subject.color}`}>
                <i className={`bx ${subject.icon}`}></i>
              </div>
              <h3>{subject.name}</h3>
              <p>Progress: {subject.progress}%</p>
              <div className="progress-bar">
                <div className="progress" style={{width: `${subject.progress}%`}}></div>
              </div>
              <div className="subject-actions">
                <button className="button button-small">Study</button>
                <button className="button button-small">Resources</button>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Subject</h2>
              <input
                type="text"
                placeholder="Subject Name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              />
              <select
                value={newSubject.icon}
                onChange={(e) => setNewSubject({...newSubject, icon: e.target.value})}
              >
                <option value="bx-book">Book</option>
                <option value="bx-math">Math</option>
                <option value="bx-atom">Science</option>
                <option value="bx-pen">Writing</option>
              </select>
              <div className="modal-actions">
                <button onClick={handleAddSubject}>Add</button>
                <button onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Progress = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('studyHours');
  const [progressData, setProgressData] = useState({
    studyHours: { 
      current: 34, target: 40, streak: 5, 
      history: [28, 32, 30, 35, 34, 38, 34],
      dailyBreakdown: [
        { day: 'Mon', hours: 6, focus: 85 },
        { day: 'Tue', hours: 5, focus: 75 },
        { day: 'Wed', hours: 7, focus: 90 },
        { day: 'Thu', hours: 4, focus: 65 },
        { day: 'Fri', hours: 6, focus: 80 },
        { day: 'Sat', hours: 3, focus: 70 },
        { day: 'Sun', hours: 3, focus: 60 }
      ]
    },
    assignments: { 
      completed: 23, total: 25, streak: 8, 
      history: [20, 21, 22, 23, 23, 24, 23],
      bySubject: [
        { subject: 'Math', completed: 8, total: 9 },
        { subject: 'Physics', completed: 6, total: 6 },
        { subject: 'Chemistry', completed: 5, total: 6 },
        { subject: 'Biology', completed: 4, total: 4 }
      ]
    },
    quizScores: { 
      average: 78, total: 100, streak: 3, 
      history: [72, 75, 80, 76, 78, 82, 78],
      recentScores: [
        { subject: 'Math', score: 85, date: '2024-01-20' },
        { subject: 'Physics', score: 78, date: '2024-01-18' },
        { subject: 'Chemistry', score: 82, date: '2024-01-15' },
        { subject: 'Biology', score: 75, date: '2024-01-12' }
      ]
    },
    attendance: { 
      present: 19, total: 20, streak: 12, 
      history: [18, 19, 19, 20, 19, 20, 19] 
    }
  });

  const getProgressPercentage = (current, total) => Math.round((current / total) * 100);

  const getDetailedStats = () => {
    switch(timeframe) {
      case 'month':
        return {
          studyHours: { 
            current: 136, target: 160, streak: 5,
            history: [120, 128, 132, 136, 140, 138, 136],
            dailyBreakdown: progressData.studyHours.dailyBreakdown,
          },
          assignments: { 
            completed: 92, total: 100, streak: 8,
            history: [85, 88, 90, 92, 94, 93, 92],
            bySubject: progressData.assignments.bySubject
          },
          quizScores: { 
            average: 82, total: 100, streak: 3,
            history: [78, 80, 82, 84, 82, 83, 82],
            recentScores: progressData.quizScores.recentScores
          },
          attendance: { 
            present: 76, total: 80, streak: 12,
            history: [72, 74, 75, 76, 77, 76, 76]
          }
        };
      case 'year':
        return {
          studyHours: { 
            current: 1632, target: 1920, streak: 5,
            history: [1500, 1550, 1600, 1632, 1650, 1645, 1632],
            dailyBreakdown: progressData.studyHours.dailyBreakdown
          },
          assignments: { 
            completed: 1104, total: 1200, streak: 8,
            history: [1000, 1050, 1080, 1104, 1120, 1110, 1104],
            bySubject: progressData.assignments.bySubject
          },
          quizScores: { 
            average: 85, total: 100, streak: 3,
            history: [80, 82, 84, 85, 86, 85, 85],
            recentScores: progressData.quizScores.recentScores
          },
          attendance: { 
            present: 912, total: 960, streak: 12,
            history: [880, 890, 900, 912, 920, 915, 912]
          }
        };
      default:
        return progressData;
    }
  };

  useEffect(() => {
    const newData = getDetailedStats();
    setProgressData(newData);
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [timeframe]);

  const renderOverviewBoxes = () => (
    <div className="overview-boxes">
      <div className="overview-box study-box" onClick={() => setSelectedMetric('studyHours')}>
        <div className="box-content">
          <div className="box-header">
            <i className='bx bx-book-open'></i>
            <span className="box-title">Study Hours</span>
          </div>
          <div className="box-stats">
            <span className="box-number">{progressData.studyHours.current}</span>
            <span className="box-label">hrs this week</span>
          </div>
          <div className="box-progress">
            <div className="progress-line">
              <div 
                className="progress-fill"
                style={{
                  width: `${Math.min((progressData.studyHours.current / progressData.studyHours.target) * 100, 100)}%`
                }}
              ></div>
            </div>
            <span className="progress-text">Target: {progressData.studyHours.target} hrs</span>
          </div>
        </div>
      </div>

      <div className="overview-box assignment-box" onClick={() => setSelectedMetric('assignments')}>
        <div className="box-content">
          <div className="box-header">
            <i className='bx bx-task'></i>
            <span className="box-title">Assignments</span>
          </div>
          <div className="box-stats">
            <span className="box-number">{progressData.assignments.completed}</span>
            <span className="box-label">completed</span>
          </div>
          <div className="box-progress">
            <div className="progress-line">
              <div 
                className="progress-fill"
                style={{
                  width: `${Math.min((progressData.assignments.completed / progressData.assignments.total) * 100, 100)}%`
                }}
              ></div>
            </div>
            <span className="progress-text">Total: {progressData.assignments.total}</span>
          </div>
        </div>
      </div>

      <div className="overview-box quiz-box" onClick={() => setSelectedMetric('quizScores')}>
        <div className="box-content">
          <div className="box-header">
            <i className='bx bx-brain'></i>
            <span className="box-title">Quiz Average</span>
          </div>
          <div className="box-stats">
            <span className="box-number">{progressData.quizScores.average}</span>
            <span className="box-label">average score</span>
          </div>
          <div className="box-progress">
            <div className="progress-line">
              <div 
                className="progress-fill"
                style={{
                  width: `${Math.min(progressData.quizScores.average, 100)}%`
                }}
              ></div>
            </div>
            <span className="progress-text">Target: 85%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainChart = () => {
    let chartData;
    let chartTitle;
    let yAxisLabel;

    switch(selectedMetric) {
      case 'studyHours':
        chartData = progressData.studyHours.dailyBreakdown;
        chartTitle = 'Daily Study Hours';
        yAxisLabel = 'Hours';
        break;
      case 'assignments':
        chartData = progressData.assignments.bySubject;
        chartTitle = 'Assignments by Subject';
        yAxisLabel = 'Count';
        break;
      case 'quizScores':
        chartData = progressData.quizScores.recentScores;
        chartTitle = 'Recent Quiz Scores';
        yAxisLabel = 'Score';
        break;
      default:
        chartData = progressData.studyHours.dailyBreakdown;
        chartTitle = 'Daily Study Hours';
        yAxisLabel = 'Hours';
    }

    return (
      <div className="main-chart">
        <h3>{chartTitle}</h3>
        <div className="chart-container">
          {selectedMetric === 'studyHours' && (
            <div className="bar-chart">
              {chartData.map((item, index) => (
                <div className="chart-bar-container" key={index}>
                  <div 
                    className={`chart-bar ${showAnimation ? 'animate' : ''}`}
                    style={{
                      height: `${(item.hours / 8) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="chart-bar-tooltip">
                      <div>Hours: {item.hours}</div>
                      <div>Focus: {item.focus}%</div>
                    </div>
                  </div>
                  <span className="chart-label">{item.day}</span>
                </div>
              ))}
            </div>
          )}

          {selectedMetric === 'assignments' && (
            <div className="bar-chart">
              {chartData.map((item, index) => (
                <div className="chart-bar-container" key={index}>
                  <div 
                    className={`chart-bar ${showAnimation ? 'animate' : ''}`}
                    style={{
                      height: `${(item.completed / item.total) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="chart-bar-tooltip">
                      <div>Completed: {item.completed}/{item.total}</div>
                      <div>Progress: {Math.round((item.completed / item.total) * 100)}%</div>
                    </div>
                  </div>
                  <span className="chart-label">{item.subject}</span>
                </div>
              ))}
            </div>
          )}

          {selectedMetric === 'quizScores' && (
            <div className="bar-chart">
              {chartData.map((item, index) => (
                <div className="chart-bar-container" key={index}>
                  <div 
                    className={`chart-bar ${showAnimation ? 'animate' : ''}`}
                    style={{
                      height: `${item.score}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="chart-bar-tooltip">
                      <div>Score: {item.score}%</div>
                      <div>Date: {item.date}</div>
                    </div>
                  </div>
                  <span className="chart-label">{item.subject}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInsightsTab = () => (
    <div className="insights-tab">
      <div className="insight-card trend-card">
        <div className="insight-icon">📈</div>
        <h3>Study Patterns</h3>
        <div className="trend-details">
          <div className="trend-item">
            <span className="trend-label">Peak Performance</span>
            <span className="trend-value">Wednesdays</span>
            <div className="trend-indicator positive">↑ 90% Focus</div>
          </div>

        </div>
      </div>

      <div className="insight-card achievement-card">
        <div className="insight-icon">🏆</div>
        <h3>Recent Achievements</h3>
        <div className="achievements-list">
          <div className="achievement-item">
            <span className="achievement-badge">🔥</span>
            <span>12-day attendance streak</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-badge">⭐</span>
            <span>85% in Math Quiz</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-badge">📚</span>
            <span>Completed all Physics assignments</span>
          </div>
        </div>
      </div>

      <div className="insight-card focus-card">
        <div className="insight-icon">⚡</div>
        <h3>Focus Analysis</h3>
        <div className="focus-metrics">
          <div className="focus-chart">
            <div className="focus-bar" style={{width: '85%'}}>
              <span>Morning</span>
              <span>85%</span>
            </div>
            <div className="focus-bar" style={{width: '65%'}}>
              <span>Afternoon</span>
              <span>65%</span>
            </div>
            <div className="focus-bar" style={{width: '75%'}}>
              <span>Evening</span>
              <span>75%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="insight-card recommendation-card">
        <div className="insight-icon">💡</div>
        <h3>Smart Recommendations</h3>
        <div className="recommendations">
          <div className="recommendation-item priority-high">
            <span className="priority-indicator"></span>
            <p>Increase study hours for Chemistry (Currently below target)</p>
          </div>
          <div className="recommendation-item priority-medium">
            <span className="priority-indicator"></span>
            <p>Review Math concepts before next week's quiz</p>
          </div>
          <div className="recommendation-item priority-low">
            <span className="priority-indicator"></span>
            <p>Maintain current Biology study pattern</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="home">
      <div className="content">
        <div className="header">
          <h1>Your Progress</h1>
          <div className="progress-filters">
            <select 
              className="progress-select"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {renderOverviewBoxes()}
              {renderMainChart()}
            </div>
          )}
          {activeTab === 'insights' && renderInsightsTab()}
        </div>
      </div>
    </section>
  );
};

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Chapter 5: Calculus',
      duration: 30,
      questions: 25,
      status: 'new'
    },
    {
      id: 2,
      subject: 'Physics',
      topic: 'Chapter 3: Mechanics',
      duration: 45,
      questions: 30,
      status: 'completed',
      score: 85
    },
    {
      id: 3,
      subject: 'Chemistry',
      topic: 'Chapter 4: Organic Chemistry',
      duration: 40,
      questions: 20,
      status: 'new'
    },
    {
      id: 4,
      subject: 'Biology',
      topic: 'Chapter 2: Cell Biology',
      duration: 35,
      questions: 28,
      status: 'new'
    },
    {
      id: 5,
      subject: 'History',
      topic: 'World War II',
      duration: 50,
      questions: 35,
      status: 'completed',
      score: 92
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizModal(true);
  };

  return (
    <section className="home">
      <div className="content">
        <div className="header">
          <h1>Available Quizzes</h1>
          <div className="quiz-filters">
            <input
              type="text"
              placeholder="Search quizzes..."
              className="quiz-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="quiz-filter">
              <option value="all">All Subjects</option>
              <option value="new">New Quizzes</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="quiz-grid">
          {filteredQuizzes.map(quiz => (
            <div className="quiz-card" key={quiz.id}>
              <div className="quiz-header">
                <h3>{quiz.subject}</h3>
                <span className={`quiz-badge ${quiz.status}`}>
                  {quiz.status === 'completed' ? 'Completed' : 'New'}
                </span>
              </div>
              <p>{quiz.topic}</p>
              <div className="quiz-meta">
                <span><i className='bx bx-time'></i> {quiz.duration} mins</span>
                <span><i className='bx bx-question-mark'></i> {quiz.questions} questions</span>
                {quiz.status === 'completed' && (
                  <span><i className='bx bx-trophy'></i> Score: {quiz.score}%</span>
                )}
              </div>
              <button 
                className="quiz-button"
                onClick={() => handleStartQuiz(quiz)}
              >
                {quiz.status === 'completed' ? 'Review' : 'Start Quiz'}
              </button>
            </div>
          ))}
        </div>

        {showQuizModal && selectedQuiz && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedQuiz.status === 'completed' ? 'Quiz Review' : 'Start Quiz'}</h2>
              <div className="quiz-details">
                <h3>{selectedQuiz.subject}</h3>
                <p>{selectedQuiz.topic}</p>
                <div className="quiz-info">
                  <p>Duration: {selectedQuiz.duration} minutes</p>
                  <p>Questions: {selectedQuiz.questions}</p>
                  {selectedQuiz.status === 'completed' && (
                    <p>Your Score: {selectedQuiz.score}%</p>
                  )}
                </div>
                {selectedQuiz.status === 'completed' ? (
                  <div className="quiz-review-actions">
                    <button onClick={() => setShowQuizModal(false)}>Close</button>
                    <button className="button-primary">View Answers</button>
                  </div>
                ) : (
                  <div className="quiz-start-actions">
                    <button onClick={() => setShowQuizModal(false)}>Cancel</button>
                    <button className="button-primary">Begin Quiz</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const AppLayout = () => (
  <>
    <Sidebar />
    <div className="home">
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/upload" element={<SingleFileUploader />} />
        </Routes>
      </div>
    </div>
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
