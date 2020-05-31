import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import API from "../../utils/API";
import signupImg from "../../images/signupImg.svg";
import { Link } from "react-router-dom";
require("dotenv").config();

function SignUpForm() {
    // Setting tab state for teacher and student singup
    const [signup, setSignup] = useState({ tab: 'teacher' });

    // Handle toggle
    function handleToggle(tabToggle) {
        setSignup({ tab: tabToggle });
        setSchools([]);
        setTeachersSelect([]);
    }

    // Load School Database
    useEffect(() => {
        loadSchoolsDB();
        loadStates();
    }, [])


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
                window.location.replace("/teachers/profile");
                console.log(res);
                console.log("Teacher signed up.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    function handleStudent(e) {
        e.preventDefault();
        // Student Data ----------------
        console.log(checkTeachers);
        API.signupStudent({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            school: schoolRef.current.value,
            teachers: checkTeachers
        })

            //send to profile page 
            .then(function (res) {
                window.location.replace("/students/profile");
                console.log(res);
                console.log('Student is signed up');
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    const [schoolsDB, setSchoolsDB] = useState([]);
    const [states, setStates] = useState([]);

    function loadStates() {
        setStates(API.getStates());
    }

    function loadSchoolsDB() {
        API.getSchoolsFromDB()
            .then(res => {
                setSchoolsDB(res.data);
            })
    }

    const [checkTeachers, setcheckTeachers] = useState([]);
    // Handle for checking checkboxes for teachers
    function handleCheckbox(e) {
        console.log('checked', e.target.checked);
        console.log('name', e.target.name);

        const newTeachers = [...checkTeachers];
        if (e.target.checked) {
            newTeachers.push(e.target.name);
        }
        else {
            const index = newTeachers.indexOf(e.target.name)
            newTeachers.splice(index, 1);
        }
        setcheckTeachers(newTeachers);
    }

    const [teachersSelect, setTeachersSelect] = useState([]);

    // Handle for when a school is selected
    function handleSchoolSelect() {
        API.getTeachersBySchool(schoolRef.current.value)
            .then(res => {
                setTeachersSelect(res.data);
            })
    };

    // Handle search
    async function handleSearch(e) {
        e.preventDefault();
        // Set schools state to empty array
        setSchools([]);
        setTeachersSelect([]);
        // Get references for the school search query as well as the state selected
        const schoolQuery = schoolQueryRef.current.value.toLowerCase();
        const state = stateRef.current.value;
        // Only run the search if schoolQuery is not empty
        if (schoolQuery) {
            // Get the school from db that matches the schoolQuery
            const schoolDbResult = await API.getSchoolByQuery(schoolQuery)
            // If there's a match along with the state
            if (schoolDbResult.data && schoolDbResult.data.state === state) {
                // Then set school state to the results
                setSchools(schoolDbResult.data.results);
                // If there's no match from the database
            } else {
                console.log("Ran third-party API");
                // Then run the third-party API to do the search
                const searchRes = await API.searchSchools(schoolQuery, state);
                console.log("3rd-party API searchRes: ", searchRes);
                // Set the school state to the result
                setSchools(searchRes);
                // Add the new school to the database
                await API.addSchoolToDB({
                    query: schoolQuery,
                    state: state,
                    results: searchRes
                });
                console.log("Added School to DB: ", searchRes);
            }
            handleSchoolSelect();
        }
    }

    function teacherSignup() {
        return (
            <form className="uk-form-stacked uk-position-relative teacherForm" uk-height-viewport="expand: true">
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Email</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium" id="email" type="text" placeholder="johndoe@email.com" ref={emailRef} />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Password</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium" id="password" type="password" placeholder="******" ref={passwordRef} />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Name</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium" id="name" type="text" placeholder="John Doe" ref={nameRef} />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Subject</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium" id="subject" type="text" placeholder="Algebra" ref={subjectRef} />
                    </div>
                </div>
                <hr />
                <div className="uk-margin uk-flex uk-flex-bottom">
                    <div className="uk-width-expand">
                        <label className="uk-form-label uk-text">School Search</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-medium" id="school" type="text" placeholder="Search for you school here" ref={schoolQueryRef} />
                        </div>
                    </div>
                    <div className='stateSel'>
                        <label className='uk-form-label uk-text'>State</label>
                        <div className='uk-form-controls'>
                            <select className='uk-form-width-xsmall' ref={stateRef}>
                                {
                                    states.length >= 1 ? (
                                        states.map(state =>
                                            <option key={state} value={state}>{state}</option>
                                        )
                                    ) : <option>--Select a State--</option>
                                }
                            </select>
                        </div>
                    </div>
                    <button className="uk-button secondaryBtn schoolSearchBtn" onClick={handleSearch}>SEARCH</button>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">School</label>
                    <div className="uk-form-controls">
                        <select className="uk-select-medium schoolSelect" ref={schoolRef} >
                            {
                                schools.length >= 1 ? (
                                    schools.map(school =>
                                        <option key={school.schoolid || school.schoolName} value={school.schoolName}>{school.schoolName}</option>
                                    )
                                ) : <option>--Select a School--</option>
                            }
                        </select>
                    </div>
                </div>
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <button className="uk-button primaryBtn" onClick={handleSignup}>Sign up</button>
                    <div className="loginText">Already have an account? <Link to="/login" className="loginLink">Log in here</Link></div>
                </div>
            </form>
        );
    }

    function studentSignup() {
        return (
            <form className="uk-form-stacked uk-position-relative studentForm" uk-height-viewport="expand: true">
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Email</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium stuInput" id="email" type="text" placeholder="kelseydoe@email.com" ref={emailRef} />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Password</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium stuInput" id="password" type="password" placeholder="******" ref={passwordRef} />
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label uk-text">Name</label>
                    <div className="uk-form-controls">
                        <input className="uk-input uk-form-width-medium stuInput" id="name" type="text" placeholder="Kelsey Doe" ref={nameRef} />
                    </div>
                </div>
                <hr />
                <div className="uk-margin uk-flex uk-flex-bottom">
                    <div className="uk-width-expand">
                        <label className="uk-form-label uk-text">School Search</label>
                        <div className="uk-form-controls">
                            <input className="uk-input uk-form-width-medium stuInput" id="school" type="text" placeholder="Search for you school here" ref={schoolQueryRef} />
                        </div>
                    </div>
                    <div className="stateSel">
                        <label className="uk-form-label uk-text">State</label>
                        <div className="uk-form-controls">
                            <select className="uk-form-width-xsmall" ref={stateRef}>
                                {
                                    states.length >= 1 ? (
                                        states.map(state =>
                                            <option key={state} value={state}>{state}</option>
                                        )
                                    ) : <option>--Select a State--</option>
                                }
                            </select>
                        </div>
                    </div>
                    <button className="uk-button secondaryBtn schoolSearchBtn" onClick={handleSearch}>Search</button>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label">School</label>
                    <div className="uk-form-controls">
                        <select className="uk-select-medium stuInput" ref={schoolRef} onChange={handleSchoolSelect}>
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
                <div className="uk-margin">
                    <label className="uk-form-label">Teachers</label>
                    <div className="uk-grid-small uk-child-width-auto uk-grid" >
                        {
                            teachersSelect.length > 0 ? (
                                teachersSelect.map(teacher =>
                                    <label key={teacher._id}><input name={teacher._id} className="uk-checkbox" type="checkbox" onChange={handleCheckbox} /> {teacher.name}</label>
                                )
                            ) : <p className="noTeacherText">Please search for a school first to view the teachers.</p>
                        }
                    </div>
                </div>
                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <button className="uk-button primaryBtn" onClick={handleStudent}>Sign up</button>
                    <div className="loginText">Already have an account? <Link to="/login" className="loginLink">Log in here</Link></div>
                </div>
            </form>
        );
    }

    return (
        <div className="uk-flex uk-child-width-1-2@s signupContainer">
            <div className="uk-margin-top"><img src={signupImg} alt="Woman leaning against a large mobile phone" uk-img="true" /></div>
            <div className="signupWrapper">
                <h2>SIGNUP</h2>
                <div className="uk-flex uk-flex-center formTabs" >
                    <button
                        className="uk-button"
                        style={signup.tab === "teacher" ? { borderBottom: "2px solid #7CEDAB", color: "#44BC74", fontWeight: "500" } : { borderBottom: "2px solid #fff", color: "#A8A8A8" }}
                        onClick={() => handleToggle("teacher")}
                    >
                        Im a Teacher
                    </button>
                    <button
                        className="uk-button"
                        style={signup.tab === "student" ? { borderBottom: "2px solid #7CEDAB", color: "#44BC74", fontWeight: "500" } : { borderBottom: "2px solid #fff", color: "#A8A8A8" }}
                        onClick={() => handleToggle("student")}
                    >
                        Im a Student
                    </button>
                </div>
                {signup.tab === "teacher" ? teacherSignup() : studentSignup()}
            </div>
        </div>
    );
}

export default SignUpForm;