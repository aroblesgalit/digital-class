import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';
import API from '../utils/API';


function TeacherProfile() {
  const [teacherState, setTeacherState] = useState({
    id: 0,
    email: "",
    name: "",
    imageUrl: "",
    school: "",
    subject: "",
    students: []
  })

  useEffect(() => {
    API.getTeacher().then(res => {
      console.log("From TeacherProfile.js getTeacher(): ", res.data)
      setTeacherState({
        ...teacherState,
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
        school: res.data.school,
        subject: res.data.subject,
        imageUrl: res.data.imageUrl
      });
    })
    // .then(
    //   API.getStudentsByTeacher(teacherState.id)
    // )
  }, []);


  return (
    <div>
      <ProfileLeftCol email={teacherState.email} name={teacherState.name} imageUrl={teacherState.imageUrl} school={teacherState.school} subject={teacherState.subject} id={teacherState.id} type="teacher" />
      <TeacherProfileContent id={teacherState.id} />
    </div>
  );
}

export default TeacherProfile;