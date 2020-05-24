import React from 'react';
import ProfileLeftCol from '../components/ProfileLeftCol';

const user = {
  name: "Ryan Gautier",
  school: "Centennial High School",
  subject: "AP Physics",
  email: "ryangautier2@gmail.com"
}


function TeacherProfile() {
 return(
     <ProfileLeftCol {...user}/>
 );
}

export default TeacherProfile;