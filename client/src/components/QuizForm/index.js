import React, { useState, useEffect } from 'react';
import API from '../../utils/API'
import './style.css';

function QuizForm() {
  const [newQuizState, setNewQuizState] = useState({
    title: "",
    teacher: "",
    timeLimitMin: 0,
    timeLimitSec: 0,
    questions: [
      {
        id: 1,
        question: "",
        choices: ["", "", "", ""],
        answer: ""
      }
    ]
  });

  // console.log("newQuizState:  " + JSON.stringify(newQuizState))


  const addQuestion = event => {
    event.preventDefault();

    const newQuestions = newQuizState.questions;
    newQuestions.push({
      id: newQuizState.questions.length + 1,
      question: "",
      choices: ["", "", "", ""],
      answer: ""
    });
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  const handleTitleChange = (event) => {
    setNewQuizState({
      ...newQuizState, title: event.target.value
    })
  }

  const handleMinutesChange = (event) => {
    setNewQuizState({
      ...newQuizState, timeLimitMin: event.target.value
    })
  }

  const handleSecondsChange = (event) => {
    setNewQuizState({
      ...newQuizState, timeLimitSec: event.target.value
    })
  }

  // This function takes event, question id, and choice number as inputs. 
  // The state will be updated to reflect user input for the associated answer choice
  const handleChoicesChange = (event, id, c) => {
    // get choices of target question from current state
    const choices = newQuizState.questions[id-1].choices;

    // update target choice
    choices[c-1] = event.target.value;

    // new array of questions
    const newQuestions = newQuizState.questions;

    // update choices of target question
    newQuestions[id-1].choices = choices;

    // update state with updated questions array
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  const handleBodyChange = (event, id) => {
    const newQuestions = newQuizState.questions;
    newQuestions[id-1].question = event.target.value;

    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }
  // takes question id and answer choice (1-4) as input, and updates the 
  // state to reflect the index of the correct answer
  const handleRadio = (id, c) => {
    const newQuestions = newQuizState.questions;
    newQuestions[id-1].answer = c-1;
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  const preventFormSubmit = (event) => {
    event.preventDefault();
  }

  const handleSubmitClick = (event) => {
    event.preventDefault();
    API.getTeacher().then(res => {
      setNewQuizState({
        ...newQuizState, teacher: res.data.id
      })
    }).then(() => {
      API.createQuiz(newQuizState);
      console.log("submitted");
    });
  
  }

  return (
    <div>
      <div className="quiz-form-container">
        <h4 className="uk-margin-large-bottom uk-margin-large-top">Create Quiz</h4>
        <form onSubmit={(event) => preventFormSubmit(event)}>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-3-4@s">
              <label htmlFor="quiz-title" className="uk-form-label" >Title</label>
              <input className="uk-input" id="quiz-title" type="text" onChange={(event) => handleTitleChange(event)} />
            </div>
            <div className="uk-width-1-4@s uk-grid uk-grid-collapse">
              <div className="uk-width-1-2">
                <label htmlFor="minutes" className="uk-form-label">Minutes</label>
                <input className="uk-input" id="minutes" type="number" min="0" onChange={(event) => handleMinutesChange(event)} placeholder="00" />
              </div>
              <div className="uk-width-1-2">
                <label htmlFor="seconds" className="uk-form-label">Seconds</label>
                <input className="uk-input" id="seconds" type="number" min="0" max="59" onChange={(event) => handleSecondsChange(event)} placeholder=":00" />
              </div>
            </div>
          </div>
          <hr className="uk-divider-icon" />

          {newQuizState.questions.map(item => {
            const radioname = 'radio' + item.id;
            return (
              <div key={item.id} className="uk-margin-large-bottom">
                <div className="uk-width-auto uk-margin-bottom">
                  <label htmlFor="question" className="uk-form-label">Question {item.id}</label>
                  <textarea className="uk-textarea" id="question" type="textarea" placeholder="Question" onChange={(event) => handleBodyChange(event, item.id)}/>
                </div>
                <div>Choice 1</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" name={radioname} onChange={() => handleRadio(item.id, 1)} className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice1" type="text" onChange={(event) => handleChoicesChange(event, item.id, 1)} />
                </div>
                <div>Choice 2</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" name={radioname} onChange={() => handleRadio(item.id, 2)} className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice2" type="text" onChange={(event) => handleChoicesChange(event, item.id, 2)} />
                </div>
                <div>Choice 3</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" name={radioname} onChange={() => handleRadio(item.id, 3)} className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice3" type="text" onChange={(event) => handleChoicesChange(event, item.id, 3)} />
                </div>
                <div>Choice 4</div>
                <div className="uk-flex uk-flex-row uk-flex-middle">
                  <input type="radio" name={radioname} onChange={() => handleRadio(item.id, 4)} className="uk-radio uk-margin-right"></input>
                  <input className="uk-input" id="choice4" type="text" onChange={(event) => handleChoicesChange(event, item.id, 4)} />
                </div>
              </div>
            )
          })}


          <div className="uk-margin-top uk-flex uk-flex-right">
            <label className="uk-button uk-button-default my-button uk-margin-small-right" onClick={addQuestion}>Add New Question</label>
            <label className="uk-button uk-button-default my-button" onClick={(event) => handleSubmitClick(event)}>Submit Quiz</label>
          </div>


        </form>



      </div>
    </div>
  )
}

export default QuizForm;