import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import API from '../../utils/API';


function StudentQuiz() {
  // initialize state for quiz questions
  const [questionState, setQuestionState] = useState({
    started: false,
    timeLimit: 0,
    questions: [{
      id: 1,
      question: "",
      choices: [],
      imageUrl: "",
      answer: 0,
      stuAnswer: ""
    }],
    currentQuestion: 0,
    feedback: ""
  });

  // initialize timer state
  const [timerState, setTimerState] = useState({
    minutes: 0,
    seconds: "00"
  })

  // initialize state for interval for timer
  const [intervalID, setIntervalID] = useState();

  // state for controlling page being displayed
  const [pageState, setPageState] = useState("quiz");

  // state for student score
  const [scoreState, setScoreState] = useState();

  // load quiz into state on page load
  useEffect(() => {
    getQuiz().then(res => {
      res.data.questions.map(item => {
        return item.stuAnswer = "";
      });
      setQuestionState({
        ...questionState, questions: res.data.questions, timeLimit: res.data.timeLimit, title: res.data.title
      });
      setTimerState({ ...timerState, minutes: res.data.timeLimit });
    })
  }, []);

  const { id } = useParams();
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

  // cancel form submit if user hits enter
  const preventFormSubmit = (event) => {
    event.preventDefault();
  }

  // update state to display next question in quiz
  const handleNextQuestion = () => {
    setQuestionState({
      ...questionState, currentQuestion: questionState.currentQuestion + 1
    });
  }

  // update state to display prev question in quiz
  const handlePrevQuestion = () => {
    setQuestionState({
      ...questionState, currentQuestion: questionState.currentQuestion - 1
    });
  }

  // update state with student feedback
  const handleFeedbackChange = (event) => {
    const feedback = event.target.value;
    setQuestionState({
      ...questionState, feedback: feedback
    })
  }

  // send student quiz results and info to result db
  const handleSubmitClick = async () => {
    // build result for sending to db
    const answers = [];
    questionState.questions.map(item => {
      return answers.push(item.stuAnswer);
    });

    const student = await API.getStudentData();
    const result = {
      answers: answers,
      quiz: id,
      student: student.data.id,
      feedback: questionState.feedback,
      score: scoreState
    }

    // send student result to result db
    await API.createResult(result).then(console.log("Result Submitted!"));
    
    // update quiz db to reflect that logged in student has taken this quiz
    await API.updateQuizStudents(result.quiz, result.student);
    window.location.replace("/students/profile");

  }


  // timer function
  const timer = () => {
    var min = timerState.minutes;
    var sec = timerState.seconds;
    clearInterval(intervalID);
    var interval = setInterval(() => {
      // change seconds to number if it was a string
      if (typeof sec === "string") {
        sec = parseInt(sec);
      }

      // if time is at end
      if (sec === 0 && min === 0) {
        endQuiz();
      }
      // if time not at end but seconds at 0
      else if (sec === 0 && min !== 0) {
        min--;
        sec = 59;
      }
      // if seconds < 10
      else if (sec <= 10) {
        sec--;
        sec = "0" + sec;
      }
      else {
        sec--;
      }
      // update state to reflect changing time
      setTimerState({
        ...timerState, seconds: sec, minutes: min
      });

    }, 1000)
    setIntervalID(interval);
  }

  const endQuiz = () => {
    clearInterval(intervalID);
    setIntervalID(null);
    goToFeedback();
  }


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
    return score.toFixed();
  }

  const handleDoneClick = (event) => {
    event.preventDefault();
    endQuiz();
  }

  const goToFeedback = () => {
    const score = gradeQuiz();
    setPageState("feedback");
    setScoreState(score);
  }

  const handleStart = () => {
    setQuestionState({
      ...questionState, started: true
    });
    timer();
  }

  const myRender = (page) => {
    if (page === "quiz") {
      return (
        <div className="quiz-form-container">
          <form onSubmit={(event) => preventFormSubmit(event)}>
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <h3 className="question-title">{questionState.title}</h3>
              <div className="time-limit uk-flex uk-flex-middle">{timerState.minutes}:{timerState.seconds}<span uk-icon="icon: clock"></span></div>
            </div>

            <div className="uk-margin-bottom question-container">
              <div className="uk-width-auto uk-margin-bottom">
                <div className="uk-flex uk-flex-middle">
                  <div className="num-box uk-flex uk-flex-column uk-flex-center uk-flex-middle">
                    <span className="current-num uk-text-large">{questionState.questions[questionState.currentQuestion].id}</span>
                    <span className="total-num uk-text-small">of {questionState.questions.length}</span>
                  </div>
                  <div className="question-text" >{questionState.questions[questionState.currentQuestion].question}</div>
                </div>

                <br />
                {questionState.questions[questionState.currentQuestion].imageUrl ?
                  <div>
                    <img src={questionState.questions[questionState.currentQuestion].imageUrl} alt="Could not be loaded" className="quiz-image" />
                  </div> : <div></div>}

              </div>
              <div className="uk-flex uk-child-width-1-2@s uk-flex-wrap uk-flex-between">
                {questionState.questions[questionState.currentQuestion].choices.map(item => {
                  let key = questionState.questions[questionState.currentQuestion].choices.indexOf(item);
                  return (
                    <div key={key} className="answer-choice uk-margin-small-bottom">
                      <div className="uk-flex uk-flex-middle">
                        <label className="uk-width-expand">
                          <input type="radio" checked={(key === questionState.questions[questionState.currentQuestion].stuAnswer)} name={"choice" + questionState.currentQuestion} onChange={() => handleRadio(key)} className="uk-radio uk-margin-right radio-choice" />
                          {item}
                        </label>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="uk-flex uk-flex-between">
              {questionState.currentQuestion > 0 ?
                <label className="uk-button uk-button-default primaryBtn" onClick={handlePrevQuestion}>Previous</label> :
                <div></div>
              }
              {questionState.currentQuestion < questionState.questions.length - 1 ?
                <label className="uk-button uk-button-default primaryBtn" onClick={handleNextQuestion}>Next</label> :
                <label className="uk-button uk-button-default primaryBtn" onClick={handleDoneClick} >Done</label>
              }
            </div>
          </form>

        </div>
      )
    }
    else if (page === "feedback") {
      return (
        <div className="full-screen">
          <div className="uk-card uk-card-body uk-card-small my-card">
            <span>Score</span>
            <div className="uk-text-large score">
              {scoreState}%
            </div>
          </div>
          <br /><br />
          Do you have any comments about this quiz for your teacher?
          <br /><br />
          <b>IMPORTANT:</b> Your score will not be submitted until you click submit below.
          <br />
          <textarea className="uk-textarea uk-margin-top my-feedback" id="feedback" type="textarea" placeholder="Feedback..." onChange={(event) => handleFeedbackChange(event)} />
          <br />
          <label className="uk-button uk-button-default primaryBtn uk-margin-top" onClick={() => handleSubmitClick()}>Submit</label>
        </div>

      )
    }
  }


  return (
    <div className="uk-flex uk-flex-center">
      {questionState.started ?
        myRender(pageState)
        : <div className="full-screen">
          <h3>{questionState.title}</h3>
          This quiz has {questionState.questions.length} questions. You will have {questionState.timeLimit} minutes to complete this quiz.
        <br /><br />
        The timer will begin when you press the start button.
        <br />
          <label className="uk-button uk-button-default primaryBtn uk-margin-top" onClick={() => handleStart()}>Start</label>
        </div>}
    </div>
  )
}

export default StudentQuiz;