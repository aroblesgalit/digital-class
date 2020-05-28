import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import API from '../../utils/API';


function StudentQuiz() {
  const [questionState, setQuestionState] = useState({
    started: "",
    page: "quiz",
    timeLimit: 0,
    questions: [{
      id: 1,
      body: "",
      choices: [],
      answer: 0,
      stuAnswer: ""
    }],
    currentQuestion: 0,
    score: "",
    feedback: ""
  });

  // load quiz into state on page load
  useEffect(() => {
    getQuiz().then(res => {
      console.log(res);
      res.data.questions.map(item => {
        item.stuAnswer = "";
      });
      setQuestionState({
        ...questionState, questions: res.data.questions, timeLimit: res.data.timeLimit, started: false, title: res.data.title
      });
    })
  }, []);

  const {id} = useParams();
  // get quiz by ID
  const getQuiz = async () => {
    const quiz = await API.getQuizById(id);
    return quiz;
  }


  // takes answer choice (0-3) as input, and updates the 
  // state to reflect the index of the correct answer
  const handleRadio = (c) => {
    let newQuestions = questionState.questions;
    newQuestions[questionState.currentQuestion].stuAnswer = c;
    setQuestionState({
      ...questionState, questions: newQuestions
    });
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

  const handleFeedbackChange = (event) => {
    const feedback = event.target.value;
    setQuestionState({
      ...questionState, feedback: feedback
    })
  }

  

  // const timer = () => {
  //   let interval = setTimeout(() => {
  //     let min = questionState.timeLimitmMin;
  //     let sec = questionState.timeLimitSec;
  //     if (sec === 0 && min !== 0) {
  //       min--;
  //       sec = 59;
  //     }
  //     else if (sec === 0 && min === 0) {
  //       clearTimeout(interval);
  //       alert("end");
  //     }
  //     else {
  //       sec--;
  //     }
  //     setQuestionState({
  //       ...questionState, timeLimitSec: sec
  //     });
  //     setQuestionState({
  //       ...questionState, timeLimitMin: min
  //     });
  //   }, 1000)
  // }


  const gradeQuiz = () => {
    let scoreArr = [];
    questionState.questions.forEach(item => {
      if (item.stuAnswer === item.answer) {
        scoreArr.push(1);
      }
      else {
        scoreArr.push(0);
      }
    })
    let sum = scoreArr.reduce(function (a, b) {
      return a + b;
    }, 0);
    let score = (sum / questionState.questions.length) * 100;
    return score.toFixed(2);
  }

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const score = gradeQuiz();
    setQuestionState({...questionState, page: "feedback", score: score});
  }

  const handleStart = () => {
    setQuestionState({
      ...questionState, started: true
    });
    // timer();
  }

  const myRender = (page) => {
    if (page === "quiz") {
    return (
      <div className="quiz-form-container">
        <h4 className="uk-margin-large-bottom uk-margin-large-top">{questionState.title}</h4>
        <form onSubmit={(event) => preventFormSubmit(event)}>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-3-4@s">
              {questionState.title}
            </div>
            <div className="uk-width-1-4@s uk-grid uk-grid-collapse uk-text-right@s time-limit">
              <div>
                Time Remaining: {questionState.timeLimit}
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
                <div key={key}>
                  <div className="uk-flex uk-flex-row uk-flex-middle uk-margin-small-bottom">
                    <input type="radio" checked={(key === questionState.questions[questionState.currentQuestion].stuAnswer)} name={"choice" + questionState.currentQuestion} onChange={() => handleRadio(key)} className="uk-radio uk-margin-right radio-choice"></input>
                    <div>{item}</div>
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
            {questionState.currentQuestion < questionState.questions.length - 1 ?
              <label className="uk-button uk-button-default my-button uk-margin-small-right" onClick={handleNextQuestion}>Next</label> :
              <label className="uk-button uk-button-default my-button-submit uk-margin-small-right" onClick={handleSubmitClick} >Done</label>
            }
          </div>
        </form>

      </div> 
    )
  }
  else if (page === "feedback") {
    return (
      <div className="full-screen">
        <div className="uk-card uk-card-body uk-card-small uk-card-secondary my-card">
          <div className="uk-text-large score">
            {questionState.score}%
          </div>
        </div>
        <br/><br/>
        Do you have any comments about this quiz for your teacher?
        <br/><br/>
        <b>IMPORTANT:</b> Your score will not be submitted until you click submit below.
        <br/>
        <textarea className="uk-textarea uk-margin-top my-feedback" id="feedback" type="textarea" placeholder="Feedback..." onChange={(event) => handleFeedbackChange(event)}/>
        <br/>
        <label className="uk-button uk-button-default my-button-submit uk-margin-top" onClick={() => handleStart()}>Submit</label>
      </div>
      
    )
  }
}


  return (
    <div>
      {questionState.started ? myRender(questionState.page) : <div className="full-screen">
        This quiz has {questionState.questions.length} questions. You will have {questionState.timeLimit} minutes to complete this quiz.
        <br/><br/>
        The timer will begin when you press the start button.
        <br/>
        <label className="uk-button uk-button-default my-button uk-margin-top" onClick={() => handleStart()}>Start</label>
        </div>}
      
    </div>
  )
}

export default StudentQuiz;