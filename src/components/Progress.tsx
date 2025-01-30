import React, { useState, useEffect } from 'react';
import './Progress.css';
import { useRef } from 'react';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('This Week');
  const [studyHours, setStudyHours] = useState(0);
  const [dailyStudyHours, setDailyStudyHours] = useState([
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 7 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 2 },
  ]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const progressData = {
    studyHours: {
      current: studyHours,
      target: 40,
      unit: 'hrs this week'
    },
    assignments: {
      completed: 23,
      total: 25,
      unit: 'completed'
    },
    quizAverage: {
      score: 78,
      target: 85,
      unit: 'average score'
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
      handleSaveStudyHours();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStartStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const handleSaveStudyHours = () => {
    const today = new Date().toLocaleString('en-us', { weekday: 'short' });
    const updatedDailyStudyHours = dailyStudyHours.map((day) =>
      day.day === today ? { ...day, hours: day.hours + timer / 3600 } : day
    );
    setDailyStudyHours(updatedDailyStudyHours);
    setStudyHours(studyHours + timer / 3600);
    handleResetTimer();
  };

  // Calculate max hours for proper scaling
  const maxHours = Math.max(...dailyStudyHours.map(d => d.hours));

  const ProgressCard = ({ title, value, total, unit, icon }) => (
    <div className="progress-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h2>{value}</h2>
        <p className="card-unit">{unit}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(value / total) * 100}%` }}
          />
        </div>
        <p className="card-target">Target: {total}</p>
      </div>
    </div>
  );

  return (
    <div className="home">
      <div className="content">
        <div className="header">
          <h1>Your Progress</h1>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="progress-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
        </div>
        <div className="timer color">
        <h2>Study Timer</h2>
        <div className="timer-display">
          <span>{Math.floor(timer / 3600).toString().padStart(2, '0')}:</span>
          <span>{Math.floor((timer % 3600) / 60).toString().padStart(2, '0')}:</span>
          <span>{(timer % 60).toString().padStart(2, '0')}</span>
        </div>
        <button onClick={handleStartStopTimer}>
          {isTimerRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleResetTimer}>Reset</button>
      </div>

        {activeTab === 'overview' && (
          <>
            <div className="progress-cards">
              <ProgressCard
                title="Study Hours"
                value={progressData.studyHours.current}
                total={progressData.studyHours.target}
                unit={progressData.studyHours.unit}
                icon="📚"
              />
              <ProgressCard
                title="Assignments"
                value={progressData.assignments.completed}
                total={progressData.assignments.total}
                unit={progressData.assignments.unit}
                icon="✓"
              />
              <ProgressCard
                title="Quiz Average"
                value={progressData.quizAverage.score}
                total={progressData.quizAverage.target}
                unit={progressData.quizAverage.unit}
                icon="📊"
              />
            </div>

            <div className="daily-study-hours">
              <h2>Daily Study Hours</h2>
              <div className="graph">
                {dailyStudyHours.map((day) => (
                  <div className="bar-container" key={day.day}>
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${(day.hours / maxHours) * 100}%`,
                        minHeight: '4px'
                      }}
                      data-hours={`${day.hours}h`}
                    />
                    <span className="day-label">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'insights' && (
          <div className="insights-content">
            <h2>Coming Soon</h2>
            <p>Detailed insights and analytics will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
