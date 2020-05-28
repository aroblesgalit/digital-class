import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function QuizList(props) {

  const myRender = (props) => {
    if (props.quizzes !== undefined) {
      if (props.quizzes.length > 0) {
        return (
          (props.quizzes.map(item => {
            return (
            <div className="uk-card uk-card-small uk-card-body uk-card-default" key={item._id}>
              <div className="uk-card-title">
                {item.title}
              </div>
              <div className="uk-card-badge uk-label">
                {item.questions.length + " Questions"}
              </div>
              <div className="uk-margin-top">
                {props.user === "teacher" ?
                  <Link to={"/results/" + item._id}>
                    View Results
            </Link>
                  : ""}
                {props.user === "student" ? <Link to={"/students/quiz/" + item._id}>
                  Take Quiz
            </Link> : <div></div>}
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
    <div>
      <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-1" uk-grid="true">
        {myRender(props)}
        {props.user === "teacher" ? <Link to="/teachers/createquiz">
          <label className="uk-button uk-button-default my-button uk-margin-small-right" >Add new...</label>
        </Link> : <div></div>}


      </div>
    </div>


  )
}

export default QuizList;