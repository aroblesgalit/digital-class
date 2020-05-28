import React from 'react';
import './style.css';
import QuizList from '../QuizList';

function StudentProfileContent(props) {

  console.log("student profile content props : " + props);
  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a>Quizzes</a></li>
      </ul>

      {<QuizList quizzes={props.quizzes[0]} user={"student"} />}
    </div>

  )
}

export default StudentProfileContent;