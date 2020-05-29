import React, { useState, useEffect } from 'react';
import API from '../../utils/API'
import './style.css';

function QuizForm() {

  // initialize quiz state with one empty question
  // this quiz state is updated with user input and sent to DB as-is on submit
  const [newQuizState, setNewQuizState] = useState({
    title: "",
    teacher: "",
    timeLimit: 0,
    questions: [
      {
        id: 1,
        question: "",
        imageUrl: "",
        choices: ["", "", "", ""],
        answer: ""
      }
    ]
  });

// set the teacher in quiz state equal to logged-in teacher's id
  useEffect(() => {
    API.getTeacher().then(res => {
      setNewQuizState({
        ...newQuizState, teacher: res.data.id
      })
    })
  }, [])

  // add new empty question to questions array in quizstate
  const addQuestion = event => {
    event.preventDefault();

    const newQuestions = newQuizState.questions;
    newQuestions.push({
      id: newQuizState.questions.length + 1,
      question: "",
      imageUrl: "",
      choices: ["", "", "", ""],
      answer: ""
    });
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  // add text from title input field to quizstate
  const handleTitleChange = (event) => {
    setNewQuizState({
      ...newQuizState, title: event.target.value
    })
  }

  // add text from time limit input field to quizstate
  const handleMinutesChange = (event) => {
    setNewQuizState({
      ...newQuizState, timeLimit: event.target.value
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

  // when image url is changed...
  // takes event for targeting input text
  // takes id for updating target question in state
  const handleImageChange = (event, id) => {
    const newQuestions = newQuizState.questions;
    newQuestions[id-1].imageUrl = event.target.value;
    setNewQuizState({
      ...newQuizState, questions: newQuestions
    })
  }

  const preventFormSubmit = (event) => {
    event.preventDefault();
  }

  // when quiz is submitted
  const handleSubmitClick = (event) => {
    event.preventDefault();
    // send quizstate to db
    API.createQuiz(newQuizState)
      .then(res => {
        console.log(res);
        window.location.replace("/teachers/profile");
      })
      .catch(err => console.log(err));
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
              <div className="uk-width-1-1">
                <label htmlFor="minutes" className="uk-form-label">Time Limit (Minutes)</label>
                <input className="uk-input" id="minutes" type="number" min="0" onChange={(event) => handleMinutesChange(event)} placeholder="00" />
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
                <div className="uk-margin-bottom">
                  <label htmlFor="imaage-url" className="uk-form-label">Add image url here...</label>
                  <input className="uk-input" id="image-url" type="text" onChange={(event) => handleImageChange(event, item.id)} />
                </div>
                {(newQuizState.questions[item.id-1].imageUrl !== "") ? 
                (<div>
                  Preview image here
                  <br/>
                  <img src={newQuizState.questions[item.id-1].imageUrl} alt={"Figure for question " +  item.id} className="quiz-image uk-margin-bottom uk-margin-top" />
                </div>) : (<div></div>)}
                
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