import React from 'react';
import './style.css';
import QuizList from '../QuizList';

function StudentProfileContent(props) {

  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a>Quizzes</a></li>
      </ul>

      {<QuizList quizzes={props.quizzes} user={"student"} />}
    </div>

  )
}

export default StudentProfileContent;