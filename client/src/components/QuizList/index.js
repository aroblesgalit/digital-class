import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function QuizList(props) {
  return (
    <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-1" uk-grid="true">
      {props.quizzes.map(item => {
        return(
          <div className="uk-card uk-card-small uk-card-body uk-card-default" key={item.id}>
            <div className="uk-card-title">
              {item.title}
            </div>
            <div className="uk-card-badge uk-label">
              {item.questions.length + " Questions"}
            </div>
            <div className="uk-margin-top">
              {item.results ? 
              <Link to="/results/321">
                View Results 
              </Link>
              : ""}
            </div>

          </div>
        )
      })}
        <Link to="/teachers/createquiz">
          <label className="uk-button uk-button-default my-button uk-margin-small-right" >Add new...</label>
        </Link>

    </div>


  )
}

export default QuizList;