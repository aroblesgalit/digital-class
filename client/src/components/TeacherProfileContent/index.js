import React, { useState, useEffect } from 'react';
import './style.css';
import StudentList from '../StudentList';
import QuizList from '../QuizList';
import API from '../../utils/API';

function TeacherProfileContent() {
  const [teacherProfileState, setTeacherProfileState] = useState({
    tab: "Students",
    students: [],
    quizzes: []
  })

  useEffect(() => {
    loadData();
  }, []);

  const handleTabChange = (selected) => {
    setTeacherProfileState({
      ...teacherProfileState,
      tab: selected
    })
  }
  
  const loadData = () => {
    API.getStudentsByTeacher()
      .then(result => {
        API.getQuizzesByTeacher()
        .then(res => {
          setTeacherProfileState({
            ...teacherProfileState, 
            quizzes: res.data, 
            students: result.data
          })
        })
      })
  }

  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a onClick={() => handleTabChange("Students")}>Students</a></li>
        <li><a onClick={() => handleTabChange("Quizzes")}>Quizzes</a></li>
      </ul>

      {teacherProfileState.tab === "Students" ? <StudentList students={teacherProfileState.students} /> : <QuizList quizzes={teacherProfileState.quizzes} />}
    </div>

  )
}

export default TeacherProfileContent;