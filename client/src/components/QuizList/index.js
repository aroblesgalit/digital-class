import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function QuizList(props) {
  console.log(props);
  console.log("quizzes : " + JSON.stringify(props));
  return (
    <div>
    <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-1" uk-grid="true">
      {props.quizzes.length > 0 && props.quizzes[0].length!==0 ? (props.quizzes[0].map(item => {
        return(
          <div className="uk-card uk-card-small uk-card-body uk-card-default" key={item._id}>
            <div className="uk-card-title">
              {item.title}
            </div>
            <div className="uk-card-badge uk-label">
              {item.questions.length + " Questions"}
            </div>
            <div className="uk-margin-top">
              {props.user === "teacher" ? 
              <Link to="/results/">
                View Results 
              </Link>
              : ""}
              {props.user === "student" ? <Link to={"/student/quiz" + item._id}>
                Take Quiz 
              </Link> : <div></div>}
            </div>

          </div>
        )
      })) : <div>No quizzes to display</div>}  
      {props.user === "teacher" ? <Link to="/teachers/createquiz">
          <label className="uk-button uk-button-default my-button uk-margin-small-right" >Add new...</label>
        </Link> : <div></div>}
        

    </div>
    </div>


  )
}

export default QuizList;