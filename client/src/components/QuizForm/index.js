import React, { useState, useEffect } from 'react';
import './style.css';

function QuizForm() {
  const [newQuizState, setNewQuizState] = useState({
    title: "",
    timeLimitMin: 0,
    timeLimitSec: 0,
    questions: [
      {
        id: 1,
        choices: ["", "", "", ""],
        correctAns: ""
      }
    ]
  });

  // console.log("newQuizState:  " + JSON.stringify(newQuizState))


  const addQuestion = event => {
    event.preventDefault();


    const newQuestions = newQuizState.questions;
    newQuestions.push({
      id: newQuizState.questions.length + 1,
      choices: ["", "", "", ""],
      correctAns: ""
    });
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  return (
    <div>
      <div className="quiz-form-container">
        <h4 className="uk-margin-large-bottom uk-margin-large-top">Create Quiz</h4>
        <form>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-3-4@s">
              <label htmlFor="quiz-title" className="uk-form-label">Title</label>
              <input className="uk-input" id="quiz-title" type="text" />
            </div>
            <div className="uk-width-1-4@s uk-grid uk-grid-collapse">
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

          {newQuizState.questions.map(item => {
            return (
              <div key={item.id}>
                <div className="uk-width-auto uk-margin-bottom">
                  <label htmlFor="question" className="uk-form-label">Question {item.id}</label>
                  <textarea className="uk-textarea" id="question" type="textarea" placeholder="Question" />
                </div>
                <div>Choice 1</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice1" type="text" />
                </div>
                <div>Choice 2</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice2" type="text" />
                </div>
                <div>Choice 3</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice3" type="text" />
                </div>
                <div>Choice 4</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice4" type="text" />
                </div>
              </div>
            )
          })}


          <div className="uk-margin-top uk-flex uk-flex-right">
            <label className="uk-button uk-button-default my-button uk-margin-small-right" onClick={addQuestion}>Add New Question</label>
            <button className="uk-button uk-button-default my-button">Submit Quiz</button>
          </div>


        </form>



      </div>
    </div>
  )
}

export default QuizForm;