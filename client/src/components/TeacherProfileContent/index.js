import React, { useState, useEffect } from 'react';
import './style.css';
import StudentList from '../StudentList';
import QuizList from '../QuizList';
import API from '../../utils/API';

function TeacherProfileContent() {
const [teacherProfileState, setTeacherProfileState] = useState({
  tab: "Students",
  students: [],
  quizes: []
})

useEffect(() => {
  getStudents();
  getQuizzes();
}, []);
  
  const handleTabChange = (selected) => {
    setTeacherProfileState({
      ...teacherProfileState, tab: selected
    })
  }


  // need to update to get by teacher id
  const getStudents = () => {
    API.getAllStudents().then(res => {
      setTeacherProfileState({
        ...teacherProfileState, students: res.data
      })
    });
  }

  // need to update to get by teacher id
  const getQuizzes = () => {
    const quizzes =[];
    return quizzes;
  }


  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a onClick={() => handleTabChange("Students")}>Students</a></li>
        <li><a   onClick={() => handleTabChange("Quizzes")}>Quizzes</a></li>
      </ul>

      {teacherProfileState.tab === "Students" ? <StudentList students={teacherProfileState.students} /> : <QuizList quizzes={getQuizzes()} />}
    </div>

  )
}

export default TeacherProfileContent;