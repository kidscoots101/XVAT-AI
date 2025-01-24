import React from 'react';
import './Quiz.css';

const Quiz = () => {
  return (
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
              <span className="quiz-badge">In Progress</span>
            </div>
            <p>Chapter 2: Cell Biology</p>
            <div className="quiz-meta">
              <span><i className='bx bx-time'></i> 35 mins</span>
              <span><i className='bx bx-question-mark'></i> 28 questions</span>
            </div>
            <button className="quiz-button">Continue</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
