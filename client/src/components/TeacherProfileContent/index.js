import React, { useState, useEffect } from 'react';
import './style.css';
import StudentList from '../StudentList';
import QuizList from '../QuizList';
import API from '../../utils/API';

function TeacherProfileContent(props) {
  const [teacherProfileState, setTeacherProfileState] = useState({
    tab: "Students",
    teacher: "",
    students: [],
    quizzes: []
  })

  useEffect(() => {
    // getTeacher();
    getStudents();
    getQuizzes();
  }, []);

  // const getTeacher = () => {
  //   API.getTeacher().
  //   then(res => {
  //     const teacherid = res.data.id;
  //     setTeacherProfileState({
  //       ...teacherProfileState, teacher: teacherid
  //     })
  //   })

  // }

  const handleTabChange = (selected) => {
    setTeacherProfileState({
      ...teacherProfileState, tab: selected
    })
  }


  // need to update to get by teacher id
  const getStudents = () => {
    // API.getTeacher()
    //   .then(res => 
        console.log("teacher : " + props.id);
        API.getStudentsByTeacher(props.id)
        .then(res => {
          console.log(res);
          
          setTeacherProfileState({
            ...teacherProfileState, students: res.data
          })
          // console.log("teacher 2: " + teacherProfileState.teacher);

        })
  };


  // need to update to get by teacher id
  const getQuizzes = () => {
    console.log("getting quizzes");
    // API.getTeacher()
      // .then(res =>
        API.getQuizByTeacher(props.id)
        .then(res => {
          console.log(res);
          setTeacherProfileState({
            ...teacherProfileState, quizzes: res.data
          })
        })
  };


  //   const quizzes =[
  //     {
  //       id: 1,
  //       title: "Unit 01 Quiz 1",
  //       questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6},{key: 7}],
  //       results: [{key: 1}]
  //     },
  //     {
  //       id: 2,
  //       title: "Unit 01 Quiz 2",
  //       questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5}],
  //       results: [{key: 1}]
  //     },
  //     {
  //       id: 3,
  //       title: "Unit 02 Quiz 1",
  //       questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6}]
  //     },
  //     {
  //       id: 4,
  //       title: "Unit 03 Quiz 1",
  //       questions: [{key: 1}, {key: 2},{key: 3},{key: 4},{key: 5},{key: 6},{key: 7}]
  //     },
  //   ];
  //   return quizzes;
  // }


  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a onClick={() => handleTabChange("Students")}>Students</a></li>
        <li><a onClick={() => handleTabChange("Quizzes")}>Quizzes</a></li>
      </ul>

      {teacherProfileState.tab === "Students" ? <StudentList students={teacherProfileState.students} /> : <QuizList quizzes={teacherProfileState.students} />}
    </div>

  )
}

export default TeacherProfileContent;