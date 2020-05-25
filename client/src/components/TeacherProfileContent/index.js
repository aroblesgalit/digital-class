import React from 'react';
import './style.css';
import StudentList from '../StudentList';

function TeacherProfileContent() {

  
  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active"><a href="">Students</a></li>
        <li><a href="">Quizzes</a></li>
      </ul>

      <StudentList />
    </div>

  )
}

export default TeacherProfileContent;