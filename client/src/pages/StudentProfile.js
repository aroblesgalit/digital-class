import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import API from '../utils/API';
import StudentProfileContent from '../components/StudentProfileContent';

function StudentProfile() {
  const [studentState, setStudentState] = useState({
    id: 0,
    email: "",
    name: "",
    school: "",
    teacherids: [],
    teachernames: [],
    subjects: [],
    quizzes: []
  })

  useEffect(() => {
    API.getStudentData().then(async (res) => {
      console.log("teachers : " + (res.data.teachers));
      console.log("length : " + res.data.teachers.length);
      var subjects = [];
      let teachernames = [];
      let quizzes = [];
      for (let i = 0; i < res.data.teachers.length; i++) {

        const result = await API.getTeacherById(res.data.teachers[i])
        subjects.push(result.data.subject);
        teachernames.push(result.data.name);

        const quiz = await API.getQuizzesForStudent(res.data.teachers[i])
        quizzes.push(quiz.data);

      }

      setStudentState({
        ...studentState,
        id: res.data.id,
        email: res.data.email,
        name: res.data.name,
        school: res.data.school,
        teacherids: res.data.teachers,
        subjects: subjects,
        teachernames: teachernames,
        quizzes: quizzes
      });

    })
  }, []);

  return (
    <div>
      <ProfileLeftCol email={studentState.email} name={studentState.name} school={studentState.school} />
      <StudentProfileContent quizzes={studentState.quizzes} />
    </div>
  );
}

export default StudentProfile;