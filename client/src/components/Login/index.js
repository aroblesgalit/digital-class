import React, { useRef } from 'react';
import './style.css';
import API from "../../utils/API";
import { Link } from 'react-router-dom';


function StudentLogin() {
   
    // Create references for the email and password inputs
    const emailRef = useRef();
    const passwordRef = useRef();
    const userRef = useRef();

    // Event handler for when the login button is clicked
    function handleLogin(e) {
        e.preventDefault();
        if (userRef.current.value === 'student'){
             // Make a post request to the login route and pass in the email and password
        API.loginStudent({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
            // Send user to profile page
            .then(function (res) {
                window.location.replace("/students/profile");
                console.log(res);
                console.log("Login worked!");
            })
            .catch(function (err) {
                console.log(err);
            });
        }else if(userRef.current.value === 'teacher'){
            API.loginTeacher({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
                // Send user to profile page
                .then(function (res) {
                    window.location.replace("/teachers/profile");
                    console.log(res);
                    console.log("Login worked!");
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        
       
    }

    return (
        <div className='loginWrapper'>
            <h3> Login:</h3>
            <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
                <div className='uk-margin'>
                <select className='uk-form-width-xsmall' ref={userRef}>
                                <option value='teacher'>Teacher Login</option>
                                <option value='student'>Student Login</option>
                            </select>
                    <label className='uk-form-label uk-text'>Email:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='student@email.com' ref={emailRef} />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Password:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='password' type='text' ref={passwordRef} />
                    </div>
                </div>
                <button className='uk-button' id='loginBtn' onClick={handleLogin}>Log in</button>
            </form>
            <div className='singup'>
                <h4 className='uk-text-meta'>Don't have an account?</h4>
            <Link to="/signup">Sign up Now</Link>
            </div>
        </div>
    );
}

export default StudentLogin;