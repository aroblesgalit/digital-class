import React, { useState, useEffect } from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';
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
    API.getStudentData().then(res => {
      console.log("teachers : " + (res.data.teachers));
      console.log("length : " + res.data.teachers.length);
      var subjects = [];
      let teachernames = [];
      for (let i = 0; i<res.data.teachers.length; i++) {
        API.getTeacherById(res.data.teachers[i]).then(result => 
          { 
            console.log("teacher data : " + JSON.stringify(result.data));
            subjects.push(result.data.subject);
  
            teachernames.push(result.data.name);
            }
          )
  
      }

    setStudentState({...studentState,
      id: res.data.id,
      email: res.data.email,
      name: res.data.name,
      school: res.data.school,
      teacherids: res.data.teachers,
      subjects: subjects,
      teachernames: teachernames
    });

    
  })
}, []);
  

 return(
   <div>
     <ProfileLeftCol email={studentState.email} name={studentState.name} school={studentState.school} teachers={studentState.teachernames} />
     <StudentProfileContent teachers={studentState.teachernames} quizzes={studentState.quizzes}/>
    </div>
 );
}

export default StudentProfile;