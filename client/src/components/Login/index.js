import React, { useRef, useState } from 'react';
import './style.css';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import womenoncomp from "../../images/womanoncomp.jpg";

function StudentLogin() {
    // Create references for the email and password inputs
    const emailRef = useRef();
    const passwordRef = useRef();
    const userRef = useRef();

    // Event handler for when the login button is clicked
    function handleLogin(e) {
        e.preventDefault();
        if (userRef.current.value === 'student') {
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
        } else if (userRef.current.value === 'teacher') {
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
        <div className="uk-flex uk-child-width-1-2 loginContainer">
            <div><img src={womenoncomp} alt="Woman on laptop" uk-img="true" /></div>
            <div className="loginWrapper">
                <h2>LOGIN</h2>
                <form className='uk-form-stacked uk-position-relative loginForm' uk-height-viewport='expand: true'>
                    <div className='uk-margin'>
                        <label className="uk-form-label uk-text">User Type</label>
                        <select ref={userRef}>
                            <option value='teacher'>I'm a teacher</option>
                            <option value='student'>I'm a student</option>
                        </select>
                    </div>
                    <div className="uk-margin">
                        <label className='uk-form-label uk-text'>Email</label>
                        <div className='uk-form-controls'>
                            <input className='uk-input' id='email' type='text' placeholder='johndoe@email.com' ref={emailRef} />
                        </div>
                    </div>
                    <div className='uk-margin'>
                        <label className='uk-form-label uk-text'>Password</label>
                        <div className='uk-form-controls'>
                            <input className='uk-input' id='password' type='password' placeholder="******" ref={passwordRef} />
                        </div>
                    </div>
                    <div className="uk-flex uk-flex-column uk-flex-middle">
                        <button className='uk-button' id='loginBtn' onClick={handleLogin}>Log in</button>
                        <div className="signupText">Don't have an account? <Link to="/signup" className="signupLink">Sign up here</Link></div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default StudentLogin;