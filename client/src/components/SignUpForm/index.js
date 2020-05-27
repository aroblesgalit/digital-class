import React, { useRef, useState } from 'react';
import './style.css';
import API from "../../utils/API";
import axios from "axios";
require("dotenv").config();


function SignUpForm() {
    //setting state for teacher and student singup
    const [signup, setSignup] = useState({tab:'teacher'});

    function handleToggle(tabToggle){
        setSignup({tab: tabToggle});
        
    }

    // Create references for all the necessary fields
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const subjectRef = useRef();
    const schoolRef = useRef();
    const schoolQueryRef = useRef();
    const stateRef = useRef();

    const [schools, setSchools] = useState([]);

    // Event handler for when the signup button is clicked
    function handleSignup(e) {
        e.preventDefault();
        // Make a post request to the sign up route and pass in the teacher data
        API.signupTeacher({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            subject: subjectRef.current.value,
            school: schoolRef.current.value
        })
            // Send user to profile page
            .then(function (res) {
                window.location.replace("/");
                console.log(res);
                console.log("Teacher signed up.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    function handleSearch(e) {
        e.preventDefault();

        const appId = process.env.REACT_APP_ID;
        const appKey = process.env.REACT_APP_KEY;

        const schoolQuery = schoolQueryRef.current.value;
        const state = stateRef.current.value;

        axios.get(`https://api.schooldigger.com/v1.2/autocomplete/schools?q=${schoolQuery}&st=${state}&appID=${appId}&appKey=${appKey}`)
            .then(res => {
                console.log(res.data.schoolMatches);
                setSchools(res.data.schoolMatches);
            })
            .catch(err => {
                console.log(err)
            })
    }

    function teacherSignup() {
        return (
            <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Email:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='kelseydoe@email.com' ref={emailRef} />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Password:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='password' type='text' ref={passwordRef} />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Name:</label>
                    <div className='uk-form-controls'>
                        <input className="uk-input uk-form-width-medium" id='name' type='text' ref={nameRef} />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Subject:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='Subject' type='text' ref={subjectRef} />
                    </div>
                </div>

                <div className='uk-margin uk-flex'>
                    <div>
                        <label className='uk-form-label uk-text'>Search For School:</label>
                        <div className='uk-form-controls'>
                            <input className='uk-input uk-form-width-medium' id='School' type='text' ref={schoolQueryRef} />
                        </div>
                    </div>
                    <div className='stateSel'>
                        <label className='uk-form-label uk-text'>State:</label>
                        <div className='uk-form-controls'>
                            <select className='uk-form-width-xsmall' ref={stateRef}>
                                <option value='TX'>TX</option>
                                <option value='CA'>CA</option>
                            </select>
                        </div>
                    </div>
                    <button className='uk-button' onClick={handleSearch}>Search for school</button>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">Select</label>
                    <div className="uk-form-controls">
                        <select className="uk-select-medium" id="form-stacked-select" ref={schoolRef} >
                            {
                                schools.length >= 1 ? (
                                    schools.map(school =>
                                        <option key={school.schoolid} value={school.schoolName}>{school.schoolName}</option>
                                    )
                                ) : <option>--Select a School--</option>
                            }
                        </select>
                    </div>
                </div>
                <button className='uk-button' id='signupBtn' onClick={handleSignup}>Sign up</button>
            </form>
            
        
);
    }

    function studentSignup() {
        return(
        <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
            <div className='uk-margin'>
                <label className='uk-form-label uk-text'>Email:</label>
                <div className='uk-form-controls'>
                    <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='kelseydoe@email.com' ref={emailRef} />
                </div>
            </div>
            <div className='uk-margin'>
                <label className='uk-form-label uk-text'>Password:</label>
                <div className='uk-form-controls'>
                    <input className='uk-input uk-form-width-medium' id='password' type='text' ref={passwordRef} />
                </div>
            </div>
            <div className='uk-margin'>
                <label className='uk-form-label uk-text'>Name:</label>
                <div className='uk-form-controls'>
                    <input className="uk-input uk-form-width-medium" id='name' type='text' ref={nameRef} />
                </div>
            </div>
            <div className='uk-margin uk-flex'>
                <div>
                    <label className='uk-form-label uk-text'>Search For School:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='School' type='text' />
                    </div>
                </div>
                <div className='stateSel'>
                    <label className='uk-form-label uk-text'>State:</label>
                    <div className='uk-form-controls'>
                        <select className='uk-form-width-xsmall'>
                            <option value='TX'>TX</option>
                            <option value='CA'>CA</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Results</label>
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label><input class="uk-checkbox" type="checkbox"></input>Mrs.Williams</label>
                    <label><input class="uk-checkbox" type="checkbox"></input>Mrs.Marr</label>
                    <label><input class="uk-checkbox" type="checkbox"></input>Mrs.Williams</label>
                    <label><input class="uk-checkbox" type="checkbox"></input>Mrs.Sullivan</label>
                    <label><input class="uk-checkbox" type="checkbox"></input>Mr.Hanh</label>
                    <label><input class="uk-checkbox" type="checkbox"></input>Mr.Berry</label>
                </div>
            </div>
            <button className='uk-button' id='signupBtn' onClick={handleSignup}>Sign up</button>
        </form>
       
 );

}

    return (
        <div className='signupWrapper'>
            <h3>Signup Form:</h3>
            <button className='uk-button' id='signupBtn' onClick={()=>handleToggle('teacher')}>Im a Teacher</button>
            <button className='uk-button' id='signupBtn' onClick={()=>handleToggle('student')}>Im a Student</button>
        {signup.tab === 'teacher' ? teacherSignup(): studentSignup()}
        </div>

    );

}

export default SignUpForm;