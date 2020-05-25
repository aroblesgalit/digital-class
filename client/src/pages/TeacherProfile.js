import React from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';
import TeacherProfileContent from '../components/TeacherProfileContent';

const user = {
  name: "Ryan Gautier",
  school: "Centennial High School",
  subject: "AP Physics",
  email: "ryangautier2@gmail.com"
}


function TeacherProfile() {
 return(
   <div>
     <ProfileLeftCol {...user}/>
     <TeacherProfileContent />
    </div>
 );
}

export default TeacherProfile;