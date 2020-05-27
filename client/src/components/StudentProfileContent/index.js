import React, { useState, useEffect } from 'react';
import './style.css';
import QuizList from '../QuizList';
import API from '../../utils/API'

function StudentProfileContent(props) {
// const [studentState, setStudentState] = useState({
// })


//   useEffect(() => {
//     const subjects = [];
//     const teachernames = [];
//     const quizzes = [];
//     console.log("props length : " + props.teachers.length);
//     console.log("props.teachers : " + props.teachers);

//     for (let i = 0; i < props.teachers.length; i++) {
//       API.getTeacherById(props.teachers[i]).then(result => {
//         subjects.push(result.data.subject);

//         teachernames.push(result.data.name);
//         API.getQuizzesForStudent(props.teachers[i]).then(quiz => {
//           quizzes.push(quiz.data);
//         })
//       }
//       )
//     }

//     setStudentState({...studentState, subjects: subjects, teachernames: teachernames, quizzes: quizzes});


//   }, []);

  // const handleTabChange = (selected) => {
  //   setTeacherProfileState({
  //     ...teacherProfileState, tab: selected
  //   })
  // }






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