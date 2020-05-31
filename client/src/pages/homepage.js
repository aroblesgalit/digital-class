import React from "react";
import { Link } from "react-router-dom";
//images
import "./homepage.css"
import studentImg from "../images/studentAvatar.svg";
import teacherImg from "../images/teacherAvatar.svg";
import featureImg from "../images/features.svg";
import stugrade from "../images/checkgrade.svg";
import quizimage from "../images/takequiz.svg";
import grading from "../images/gradequiz.svg";
import makequiz from "../images/createquiz.svg";
import aboutImg from "../images/about.svg";

function Homepage() {
    return (
        <div>

            <div className="uk-flex uk-child-width-1-2@m about-section">

                <div className="uk-margin-top uk-flex uk-flex-column uk-flex-middle">
                    <h1 className="uk-text-center">Digital Class</h1>
                    <p className="uk-text-center">
                        Digital Class is an improved way for teacher to create and assign quizzes all
                        at the touch of the keyboard. Students will be able to take quizzes and see their
                        grades where ever they are as long as they have internet access.
                    </p>
                    <Link to="/signup">
                        <button className='uk-button primaryBtn'>Sign up</button>
                    </Link>
                    <div className="uk-flex uk-flex-around user-cards-wrapper">
                        <div className="user-card uk-card uk-card-small uk-card-body uk-card-default uk-text-center uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-flex uk-flex-middle avi-container">
                                <img className="uk-responsive-width" src={teacherImg} alt="Avatar" />
                            </div>
                            <div>I'm a Teacher</div>
                            <p className="user-story">
                                As a teacher, I want to be able to create quizzes, assign them to my
                                students, and analyze the results so I know how my students are doing.
                            </p>
                        </div>
                        <div className="user-card uk-card uk-card-small uk-card-body uk-card-default uk-text-center uk-flex uk-flex-column uk-flex-middle">
                            <div className="uk-flex uk-flex-middle avi-container">
                                <img className="uk-responsive-width" src={studentImg} alt="Avatar" />
                            </div>
                            <div>I'm a Student</div>
                            <p className="user-story">
                                As a student, I want to be able to view all the quizzes each of my
                                teachers has made so that I’ll be able to take them on the go.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="uk-flex uk-flex-center uk-flex-middle">
                    <img src={aboutImg} alt="Girl on laptop" className="about-img" uk-img="true" />
                </div>

            </div>

            <div className="uk-flex uk-child-width-1-2@m features-section">
                <div>
                    <div className="uk-flex uk-child-width-1-2@m uk-flex-between feature-cards-wrapper">
                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={makequiz} alt="Feature" uk-img="true" />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Creat Quizzes</h3>
                                <p className="feature-text uk-text-center">Teachers will be able to easily create mulitple choice quizzes with time limit.</p>
                            </div>
                        </div>

                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={grading} alt="Feature" uk-img="true" />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">View Results</h3>
                                <p className="feature-text uk-text-center">At the click of a button, teachers will see the quiz results with feedback
                                from the students and be able to better analyze where their students are struggling.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-flex uk-child-width-1-2@m uk-flex-between feature-cards-wrapper">
                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={quizimage} alt="Feature" uk-img="true" />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Take Quizzes</h3>
                                <p className="feature-text uk-text-center">Students can take a quiz from anywhere on any device and be able to submit feedback
                                at the end of each quiz.</p>
                            </div>
                        </div>

                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={stugrade} alt="Feature" uk-img="true" />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Quiz Scores</h3>
                                <p className="feature-text uk-text-center">Students are presented with their grades as soon as they are done taking the quiz.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <h2 className="uk-title uk-text-center">Features</h2>
                    <img src={featureImg} alt="Guy watching a video" className="about-img" uk-img="true" />
                </div>
            </div>
        </div>
    );
}


export default Homepage