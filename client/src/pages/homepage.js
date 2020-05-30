import React from "react";
import { List, ListItem } from "../components/List";
//images
import "./homepage.css"
import studentImg from "../images/studentAvatar.svg";
import teacherImg from "../images/teacherAvatar.svg";
import stugrade from "../images/stugrades.jpg"
import quizimage from "../images/107284-ON60QE-338.jpg"
import grading from "../images/grading.jpg"
import makequiz from "../images/makequiz.jpg"
import mainfeature from "../images/mainfeature.jpg"
import headphones from "../images/headphones.jpg"



function Homepage() {
    return (
        <div className="uk-padding-large">

            <div className="uk-flex uk-child-width-1-2@m about-section">

                <div>
                    <h1 className="uk-text-large uk-text-center">Digital Class</h1>
                    <p className="uk-text-center">
                        Digital Class is a improved way for teacher to create and grade quizzes all
                        at the touch of the keyboard. Students will be able to take the quiz and see
                        their grade where ever they are as long as they have internet access.
                    </p>
                    <div className="uk-flex uk-flex-around">
                        <div className="uk-card uk-card-small uk-card-body uk-card-default uk-text-center uk-flex uk-flex-column uk-flex-middle studentCard">
                            <div className="uk-flex uk-flex-middle img-container">
                                <img className="uk-responsive-width" src={teacherImg} alt="Avatar" />
                            </div>
                            <div className="studentName">I'm a Teacher</div>
                            <p>
                                As a teacher, I want to be able to create quizzes, assign them to my 
                                students, and analyze the results so I know how my students are doing.
                            </p>
                        </div>
                        <div className="uk-card uk-card-small uk-card-body uk-card-default uk-text-center uk-flex uk-flex-column uk-flex-middle studentCard">
                            <div className="uk-flex uk-flex-middle img-container">
                                <img className="uk-responsive-width" src={studentImg} alt="Avatar" />
                            </div>
                            <div className="studentName">I'm a Student</div>
                            <p>
                                As a student, I want to be able to view all the quizzes each of my
                                teachers has made so that I’ll be able to take them on the go.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="uk-flex uk-flex-center uk-flex-middle">
                    <img src={headphones} alt="Girl on laptop" className="about-img" uk-img={true} />
                </div>

            </div>

            <div className="uk-grid features-section">
                <div className="uk-width-1-2">
                    <div className="uk-margin-large-top uk-card uk-card-default uk-card-body">
                        <div className="uk-grid uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-width-1-4">
                                <img src={makequiz} />
                            </div>
                            <div className="uk-width-5-6">
                                <h3 className="uk-card-title"> Creat Quizzes </h3>
                                <p className="uk-text-center">Any teacher will be able to easily create mulitple choice quizzes.</p>
                            </div>
                        </div>
                    </div>


                    <div className="uk-margin-small-top uk-card uk-card-default uk-card-body">
                        <div className="uk-grid uk-flex uk-flex-column uk-flex-middle"
                        ><div className="uk-width-1-4">
                                <img src={grading} />
                            </div>
                            <div className="uk-width-5-6">
                                <h3 className="uk-card-title"> Grade Quizzes </h3>
                                <p className="uk-text-center">At the click of a button you will see what grade your students got as well as see where they struggles with our quiz analytics. </p>
                            </div>
                        </div>
                    </div>


                    <div className="uk-margin-small-top uk-card uk-card-default uk-card-body">
                        <div className="uk-grid uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-width-1-4">
                                <img src={quizimage} />
                            </div>
                            <div className="uk-width-5-6">
                                <h3 className="uk-card-title"> Take Quizzes </h3>
                                <p className="uk-text-center">Students can take a quiz from anywhere on any device.</p>
                            </div>
                        </div>
                    </div>


                    <div className="uk-margin-small-top uk-card uk-card-default uk-card-body">
                        <div className="uk-grid uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-width-1-4">
                                <img src={stugrade} uk-img="true" className="quizimage" />
                            </div>
                            <div className="uk-width-5-6">
                                <h3 className="uk-card-title"> Check Your Grades </h3>
                                <p className="uk-text-center">As soon as the student is done taking a quiz they will be able to instantly see their grade.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-width-1-2">
                    <h2 className="uk-title uk-text-center">Features</h2>
                    <div className="uk-margin-large">
                        <div className="img" style={{ height: "400px" }}>
                            <img src={mainfeature} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Homepage