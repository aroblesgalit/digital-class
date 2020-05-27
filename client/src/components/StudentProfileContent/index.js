import React, { useState, useEffect } from 'react';
import './style.css';
import QuizList from '../QuizList';

function StudentProfileContent(props) {

  useEffect(() => {
    
  }, []);

  // const handleTabChange = (selected) => {
  //   setTeacherProfileState({
  //     ...teacherProfileState, tab: selected
  //   })
  // }



  return (

    <div className="content">
      <ul uk-tab="true">
        {props.subjects.map(item => {
        return (
          <li className="uk-active" ><a>{item}</a></li>
        )})}
}
      </ul>

      {<QuizList quizzes={props.quizzes} />}
    </div>

  )
}

export default StudentProfileContent;