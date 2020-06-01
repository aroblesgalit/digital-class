import React, { useRef, useState } from 'react';
import './style.css';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import loginImg from "../../images/loginImg.svg";

function StudentLogin() {

    // Setting tab state for teacher and student login
    const [loginTab, setLoginTab] = useState({ tab: 'teacher' });

    // Handle tab toggle
    function handleTabToggle(tabToggle) {
        setLoginTab({ tab: tabToggle });
    }

    // Create references for the email and password inputs
    const emailRef = useRef();
    const passwordRef = useRef();
    // const userRef = useRef();
    const [isWronglogin, setisWronglogin] = useState(false);

    

    // Event handler for when the login button is clicked
    function handleLogin(e) {
        e.preventDefault();
        if (loginTab.tab === 'student') {
            // Make a post request to the login route and pass in the email and password
            API.loginStudent({
                email: emailRef.current.value.toLowerCase(),
                password: passwordRef.current.value
            })
                // Send user to profile page
                .then(function (res) {
                    window.location.replace("/students/profile");
                    console.log("Login worked!");
                })
                .catch(function (err) {
                    console.log(err);
                    setisWronglogin(true);
                });
        } else if (loginTab.tab === 'teacher') {
            API.loginTeacher({
                email: emailRef.current.value.toLowerCase(),
                password: passwordRef.current.value
            })
                // Send user to profile page
                .then(function (res) {
                    window.location.replace("/teachers/profile");
                    console.log("Login worked!");
                })
                .catch(function (err) {
                    console.log(err)
                    setisWronglogin(true);
                });
        }
    }

    return (
        <div className="uk-flex uk-child-width-1-2@s loginContainer">
            <div className="uk-margin-top"><img src={loginImg} alt="Man leaning on large mobile phone" uk-img="true" /></div>
            <div className="loginWrapper">
                <h2>LOGIN</h2>
                <div className="uk-flex uk-flex-center formTabs" >
                    <button
                        className="uk-button"
                        style={loginTab.tab === "teacher" ? { borderBottom: "2px solid #7CEDAB", color: "#44BC74", fontWeight: "500" } : { borderBottom: "2px solid #fff", color: "#A8A8A8" }}
                        onClick={() => handleTabToggle("teacher")}
                    >
                        Im a Teacher
                    </button>
                    <button
                        className="uk-button"
                        style={loginTab.tab === "student" ? { borderBottom: "2px solid #7CEDAB", color: "#44BC74", fontWeight: "500" } : { borderBottom: "2px solid #fff", color: "#A8A8A8" }}
                        onClick={() => handleTabToggle("student")}
                    >
                        Im a Student
                    </button>
                </div>
                <form className='uk-form-stacked uk-position-relative loginForm' uk-height-viewport='expand: true'>
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
                        { isWronglogin ? <div className='uk-alert-danger' uk-alert='true'>Incorrect pasword or email Try Again.</div>
                        : 
                        <div></div>
                    }

                    </div>
                    <div className="uk-flex uk-flex-column uk-flex-middle">
                        <button className='uk-button primaryBtn' onClick={handleLogin}>Log in</button>
                        <div className="signupText">Don't have an account? <Link to="/signup" className="signupLink">Sign up here</Link></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentLogin;