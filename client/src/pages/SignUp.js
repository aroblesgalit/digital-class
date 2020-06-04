import React from 'react';
import SignUpForm from '../components/SignUpForm';
import "./signup.css";

function SignUp() {
 return(
     <div className='container'>
         <h2 className='uk-text-center'>SignUp</h2>
         <div className='contactWrapper uk-child-width-1-2@m' uk-grid='true'>
             <SignUpForm />
         </div>
     </div>
 );
}

export default SignUp;