import React, { useState, useEffect } from 'react';
import './style.css';
import StudentList from '../StudentList';
import QuizList from '../QuizList';
import ShareList from '../ShareList';
import API from '../../utils/API';

function TeacherProfileContent(props) {
  const [teacherProfileState, setTeacherProfileState] = useState({
    tab: "Students",
    students: [],
    quizzes: []
    // shared: []
  })

  useEffect(() => {
    loadData();
    // if (props.sharedQuizzes){
    //   getSharedQuizzes();
    // }
  }, []);

  // useEffect(() => {
  //   if (teacherProfileState.tab === "Shared"){
  //     getSharedQuizzes();
  //   }
  // }, [teacherProfileState.tab]);

  // const getSharedQuizzes = async () => {
  //   const shared = [];
  //   for (let i = 0; i < props.sharedQuizzes.length; i++) {
  //     await API.getQuizById(props.sharedQuizzes[i]).then(sharedRes => shared.push(sharedRes.data))
  //   }
  //   setTeacherProfileState({...teacherProfileState, shared: shared});
  // }

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
              students: result.data,
            })
          })
      })
  }

  const renderTab = () => {
    if (teacherProfileState.tab === "Students") {
      return (<StudentList students={teacherProfileState.students} />)
    }
    else if (teacherProfileState.tab === "Quizzes") {
      return (<QuizList quizzes={teacherProfileState.quizzes} user={"teacher"} id={props.id} school={props.school} />)
    }
    else if (teacherProfileState.tab === "Shared") {
      return (
        <div>
          <ShareList quizIds={props.sharedQuizzes} user={"teacher"} id={props.id}/>
        </div>)
    }
  }

  return (

    <div className="content">
      <ul uk-tab="true">
        <li className="uk-active" ><a onClick={() => handleTabChange("Students")}>Students</a></li>
        <li><a onClick={() => handleTabChange("Quizzes")}>Quizzes</a></li>
        <li><a onClick={() => handleTabChange("Shared")}>Shared</a></li>
      </ul>

      {renderTab()}
    </div>

  )
}

export default TeacherProfileContent;