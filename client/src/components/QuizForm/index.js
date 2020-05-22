import React from 'react';
import './style.css';

function QuizForm() {
  return (
    <div>
      <div className="quiz-form-container uk-container">
        <h4 className="uk-margin-large-bottom">Create Quiz</h4>
        <form>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-3-4">
              <label htmlFor="quiz-title" className="uk-form-label">Title</label>
              <input className="uk-input" id="quiz-title" type="text" />
            </div>
            <div className="uk-width-1-4 uk-grid">
              <div className="uk-width-1-2">
                <label htmlFor="minutes" className="uk-form-label">Minutes</label>
                <input className="uk-input" id="minutes" type="number" placeholder="00" />
              </div>
              <div className="uk-width-1-2">
                <label htmlFor="seconds" className="uk-form-label">Seconds</label>
                <input className="uk-input" id="seconds" type="number" placeholder=":00" />
              </div>
            </div>
          </div>
          <hr className="uk-divider-icon" />
          <div className="uk-width-1-2@s">
            <input className="uk-input" type="text" placeholder="50" />
          </div>
          <div className="uk-width-1-4@s">
            <input className="uk-input" type="text" placeholder="25" />
          </div>

          <div className="uk-width-1-2@s">
            <input className="uk-input" type="text" placeholder="50" />
          </div>
          <div className="uk-width-1-2@s">
            <input className="uk-input" type="text" placeholder="50" />
          </div>
        </form>

      </div>
    </div>
  )
}

export default QuizForm;