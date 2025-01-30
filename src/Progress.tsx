import React, { useState } from 'react';
import './Progress.css';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('This Week');
  
  const progressData = {
    studyHours: {
      current: 34,
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
    },
    dailyStudyHours: [
      { day: 'Mon', hours: 8 },
      { day: 'Tue', hours: 6 },
      { day: 'Wed', hours: 7 },
      { day: 'Thu', hours: 4 },
      { day: 'Fri', hours: 5 },
      { day: 'Sat', hours: 2 },
      { day: 'Sun', hours: 2 }
    ]
  };

  // Calculate max hours for proper scaling
  const maxHours = Math.max(...progressData.dailyStudyHours.map(d => d.hours));

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
                {progressData.dailyStudyHours.map((day) => (
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
