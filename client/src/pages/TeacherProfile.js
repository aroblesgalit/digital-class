import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';
import API from '../utils/API';
import "./profile.css";

function TeacherProfile() {
  const [teacherState, setTeacherState] = useState({});

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
    <div className="profile-container">
      <ProfileLeftCol email={teacherState.email} name={teacherState.name} imageUrl={teacherState.imageUrl} school={teacherState.school} subject={teacherState.subject} id={teacherState.id} type="teacher" />
      <TeacherProfileContent id={teacherState.id} school={teacherState.school}/>
    </div>
  );
}

export default TeacherProfile;