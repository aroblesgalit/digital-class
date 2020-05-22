import React, { useState, useRef } from 'react';
import './style.css';
import axios from "axios";


function StudentLogin() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [studentState, setStudent] = useState({});

    function handleLogin(e) {
        e.preventDefault();

        setStudent({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });

        axios.post("/api/student-login/login", studentState)
            .then(function(res) {
                console.log(res);
                console.log("Login worked!");
                window.location.replace("/profile");
            })
            .catch(function(err) {
                console.log(err);
            });
    }

 return(
    <div className='loginWrapper'>
    <h3>Student Login:</h3>
    <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
        <div className='uk-margin'>
            <label className='uk-form-label uk-text'>Email:</label>
            <div className='uk-form-controls'>
                <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='student@email.com' ref={emailRef}/>
            </div>
        </div>
        <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Password:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='password' type='text' ref={passwordRef}/>
                    </div>
                </div>
                <button className='uk-button' id='loginBtn' onClick={handleLogin}>Log in</button>
        </form>
        </div>
 );
}

export default StudentLogin;