import React, { useState, useEffect } from 'react';
// import API from '../../utils/API'
import './style.css';

function StudentQuiz(props) {
  const [questionState, setQuestionState] = useState({
    timeLimit: 0,
    questions: [{
        id: 1,
        body: "",
        choices: [],
        answer: 0,
        stuAnswer: ""
      }],
      currentQuestion: 0
  });

  // load quiz into state on page load
  useEffect(() => {
    const myquiz = getQuiz();
    let newQuestions = myquiz.questions;

    newQuestions.map(item => {
      item.stuAnswer = "";
    });
    setQuestionState({
      ...questionState, questions: newQuestions
    });
  }, []);

  // console.log("newQuizState:  " + JSON.stringify(newQuizState))

  // get quiz by ID
  const getQuiz = () => {
    return quiz;
  }

  const quiz = {
    title: "Quiz 01",
    timeLimit: 10,
    questions: [
      {
        id: 1,
        body: "This is question 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra pharetra ligula at vehicula. Integer accumsan sagittis diam ac scelerisque. Nunc nulla dolor, molestie non augue quis, tempus bibendum ante. Phasellus tincidunt, dui nec vehicula venenatis, turpis turpis vulputate felis, id elementum lorem dui id velit. Phasellus consequat ante vulputate suscipit imperdiet. Duis volutpat eget libero id aliquam? ",
        choices: [
          "Choice 11", "Choice 12", "Choice 13", "Choice 14"
        ],
        answer: 3
      },
      {
        id: 2,
        body: "This is question 2",
        choices: [
          "Choice 21", "Choice 22", "Choice 23", "Choice 24"
        ],
        answer: 2
      },
      {
        id: 3,
        body: "This is question 3",
        choices: [
          "Choice 31", "Choice 32", "Choice 33", "Choice 34"
        ],
        answer: 1
      },
      {
        id: 4,
        body: "This is question 4",
        choices: [
          "Choice 41", "Choice 42", "Choice 43", "Choice 44"
        ],
        answer: 3
      },
      {
        id: 5,
        body: "This is question 5",
        choices: [
          "Choice 51", "Choice 52", "Choice 53", "Choice 54"
        ],
        answer: 0
      }
    ]
  }


  // takes question id and answer choice (1-4) as input, and updates the 
  // state to reflect the index of the correct answer
  const handleRadio = (c) => {
    // const newQuestions = newQuizState.questions;
    // newQuestions[id - 1].answer = c - 1;
    // setNewQuizState({
    //   ...newQuizState, questions: newQuestions
    return c;
    // })
  }

  const preventFormSubmit = (event) => {
    event.preventDefault();
  }

  const handleNextQuestion = () => {
    setQuestionState({
      ...questionState, currentQuestion: questionState.currentQuestion + 1
    });
  }

  const handlePrevQuestion = () => {
    setQuestionState({
      ...questionState, currentQuestion: questionState.currentQuestion - 1
    });
  }

  // const timer = () => {
  //   let interval = setInterval(() => {
  //     let min = questionState.timeLimitmMin;
  //     setQuestionState({
  //       ...questionState, timeLimit: questionState.timeLimit -1;
  //     });
  //   }, 1000)
  // }

  // const handleSubmitClick = (event) => {
  //   event.preventDefault();
  //   API.getTeacher().then(res => {
  //     setNewQuizState({
  //       ...newQuizState, teacher: res.data.id
  //     })
  //   }).then(() => {
  //     API.createQuiz(newQuizState);
  //     console.log("submitted");
  //   });

  // }

  return (
    <div>
      <div className="quiz-form-container">
        <h4 className="uk-margin-large-bottom uk-margin-large-top">{quiz.title}</h4>
        <form onSubmit={(event) => preventFormSubmit(event)}>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-3-4@s">
              {quiz.title}
            </div>
            <div className="uk-width-1-4@s uk-grid uk-grid-collapse uk-text-right@s time-limit">
              <div>
                Time Remaining: {quiz.timeLimit}
              </div>
            </div>
          </div>
          <hr className="uk-divider-icon" />

              <div className="uk-margin-large-bottom">
                <div className="uk-width-auto uk-margin-bottom">
                  <div className="uk-margin-small-bottom uk-text-large">Question {questionState.questions[questionState.currentQuestion].id}</div>
                  <div className="" >{questionState.questions[questionState.currentQuestion].body}</div>
                </div>
                {questionState.questions[questionState.currentQuestion].choices.map(item => {
                  let key = questionState.questions[questionState.currentQuestion].choices.indexOf(item);
                  return (
                    <div key={key+1}>
                      <div className="uk-flex uk-flex-row uk-flex-middle uk-margin-small-bottom">
                        <input type="radio" name="choice" onChange={() => handleRadio(key)} className="uk-radio uk-margin-right"></input>
                        <div className="" id="choice1">{item}</div>
                      </div>
                    </div>
                  )
                })}

                
              </div>
            
          


          <div className="uk-margin-top uk-flex uk-flex-right">
          {questionState.currentQuestion > 0 ? 
              <label className="uk-button uk-button-default my-button uk-margin-small-right" onClick={handlePrevQuestion}>Previous</label> :
              <div></div>
            }
            {questionState.currentQuestion < questionState.questions.length-1 ? 
              <label className="uk-button uk-button-default my-button uk-margin-small-right" onClick={handleNextQuestion}>Next</label> :
              <label className="uk-button uk-button-default my-button uk-margin-small-right" >Submit</label>
            }

          </div>


        </form>



      </div>
    </div>
  )
}

export default StudentQuiz;