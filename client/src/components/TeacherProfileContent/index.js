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
    API.getTeacher()
    .then(res => API.getStudentsByTeacher(res.data.id)
    .then(res => { 
      console.log(res);
      setTeacherProfileState({
        ...teacherProfileState, students: res.data
      })
    }))};
      
    // });
    // const students = [
    //   {
    //     id: 1,
    //     name: "Cynthia Dominguez",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 2,
    //     name: "Alvin Galit",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 3,
    //     name: "Ryan Gautier",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 4,
    //     name: "Jordan Roenitz",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 5,
    //     name: "Michale Cassarro",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 6,
    //     name: "Another Student",
    //     email: "email@email.com"
    //   },
    //   {
    //     id: 7,
    //     name: "Ryan A",
    //     email: "email@email.com"
    //   }
    // ];
  // }

  // need to update to get by teacher id
  const getQuizzes = () => {
    const quizzes =[
      {
        id: 1,
        title: "Unit 01 Quiz 1",
        questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6},{key: 7}],
        results: [{key: 1}]
      },
      {
        id: 2,
        title: "Unit 01 Quiz 2",
        questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5}],
        results: [{key: 1}]
      },
      {
        id: 3,
        title: "Unit 02 Quiz 1",
        questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6}]
      },
      {
        id: 4,
        title: "Unit 03 Quiz 1",
        questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6},{key: 7}]
      },
    ];
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