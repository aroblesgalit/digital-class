import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';
import API from '../utils/API';


function TeacherProfile() {
  const [teacherState, setTeacherState] = useState({
    id: 0,
    email: "",
    name: "",
    school: "",
    subject: "",
    students: []
  })

  useEffect(() => {
    API.getTeacher().then(res => {
      setTeacherState({
        ...teacherState,
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
        school: res.data.school,
        subject: res.data.subject
      });
    }).then(
      API.getStudentsByTeacher(teacherState.id)
    )
  }, []);


  return (
    <div>
      <ProfileLeftCol email={teacherState.email} name={teacherState.name} school={teacherState.school} subject={teacherState.subject} id={teacherState.id} />
      <TeacherProfileContent id={teacherState.id} />
    </div>
  );
}

export default TeacherProfile;