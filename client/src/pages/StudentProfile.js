import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';
import API from '../utils/API';






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
    API.getStudentData().then(res => {
    setStudentState({...studentState,
      id: res.data.id,
      email: res.data.email,
      name: res.data.name,
      school: res.data.school,
      teacherids: res.data.teachers
    });
  }).then(() => {
    for (let i = 0; i<studentState.length; i++) {
      API.getTeacherById(studentState.teachers[i]).then(res => 
        { 
          let subjects = studentState.subjects;
          subjects.push(res.data.subject);

          let teachernames = studentState.teachernames;
          teachernames.push(res.data.name);

          setStudentState({...studentState, subjects: subjects, teachernames: teachernames})
        }
        )

    }
  }
  )
}, []);
  

 return(
   <div>
     <ProfileLeftCol email={studentState.email} name={studentState.name} school={studentState.school} teachers={studentState.teachernames} />
     
    </div>
 );
}

export default StudentProfile;