import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API'
import './style.css';

function QuizList(props) {
// initialize user state for storing student id
const [userState, setUserState] = useState();

// on load, get student id and update user state
useEffect(() => {
  getUser()
},[]);

async function getUser() {
  if (props.user === "student") {
    const {data: {id}} = await API.getStudentData();
    setUserState(id);
  }
}
  

  const myRender = (props) => {
    // if there is a quiz item in props
    if (props.quizzes !== undefined) {
      // if props.quizzes is not empty
      if (props.quizzes.length > 0) {
        return (
          // for each quiz in the array in props
          (props.quizzes.map(item => {
            // render the quiz card
            return (
              <div className="uk-card uk-card-small uk-card-body uk-card-default quizCard" key={item._id}>
                <div className="uk-flex uk-flex-column uk-flex-middle card-top">
                  <div className="uk-card-title card-title">
                    {item.title}
                  </div>
                  <div className="card-subtitle">
                    {item.questions.length + " Questions"}
                  </div>
                </div>
                <div className="card-bottom uk-flex uk-flex-center">
                  {/* if the user is a teacher */}
                  {props.user === "teacher" ?
                  // show the view results button
                    <Link to={"/teachers/results/" + item._id} className="result-link uk-button">
                      View Results
                    </Link>
                    : ""}
                    {/* if the user is a student and the student id is in the results array of the quiz*/}
                  {props.user === "student" && item.students.indexOf(userState) === -1 ?
                  // show the take quiz button
                    <Link to={"/students/quiz/" + item._id} className="quiz-link uk-button">
                      Take Quiz
                    </Link>
                    // else the show the disabled quiz-taken button
                    : props.user === "student" && <button class="uk-button uk-button-default" disabled={true}>Quiz Taken</button>}
                </div>
              </div>
            )
          }))
        )
      }
      else {
        // if there is no quiz to load
        return (
          <div>No quizzes to display</div>
        )
      }
    }
  }

  return (
    <div className="uk-flex uk-flex-between">
      <div className="uk-flex uk-flex-wrap">
        {myRender(props)}
      </div>
      {props.user === "teacher" ?
      <div className="createBtnContainer">
        <Link to="/teachers/createquiz">
          <span uk-icon="icon: plus" className="uk-flex uk-flex-center uk-flex-middle createBtn"></span>
        </Link>
      </div>
      : <div></div>
    }
    </div>
  )
}

export default QuizList;