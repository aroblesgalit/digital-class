import React, { useState } from 'react';
import './style.css';
import StudentList from '../StudentList';
import QuizList from '../QuizList';

function TeacherProfileContent() {
const [teacherProfileState, setTeacherProfileState] = useState({
  tab: "Students"
})
  
  const handleTabChange = (selected) => {
    setTeacherProfileState({
      ...teacherProfileState, tab: selected
    })
  }


  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a onClick={() => handleTabChange("Students")}>Students</a></li>
        <li><a   onClick={() => handleTabChange("Quizzes")}>Quizzes</a></li>
      </ul>

      {teacherProfileState.tab === "Students" ? <StudentList /> : <QuizList />}
    </div>

  )
}

export default TeacherProfileContent;