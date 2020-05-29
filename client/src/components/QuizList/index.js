import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API'
import './style.css';

function QuizList(props) {
const [userState, setUserState] = useState();
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
    if (props.quizzes !== undefined) {
      if (props.quizzes.length > 0) {
        return (
          (props.quizzes.map(item => {
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
                  {props.user === "teacher" ?
                    <Link to={"/teachers/results/" + item._id} className="result-link">
                      View Results
                    </Link>
                    : ""}
                  {props.user === "student" && item.students.indexOf(userState) === -1 ?
                    <Link to={"/students/quiz/" + item._id} className="quiz-link">
                      Take Quiz
                    </Link>
                    : <div className="uk-button uk-button-default" disabled="true">Quiz Taken</div>}
                </div>
              </div>
            )
          }))
        )
      }
      else {
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