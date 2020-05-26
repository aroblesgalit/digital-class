import React from 'react';
import './style.css';

function QuizList(props) {
  return (
    <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-1" uk-grid="true">
      {props.quizzes.map(item => {
        return(
          <div className="uk-card uk-card-default uk-card-body">{item.title}</div>
        )
      })}
        <label className="uk-button uk-button-default my-button uk-margin-small-right" >Add new...</label>

    </div>


  )
}

export default QuizList;