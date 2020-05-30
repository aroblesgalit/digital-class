import React from "react";
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

                <div className="uk-margin-top">
                    <h1 className="uk-text-center">Digital Class</h1>
                    <p className="uk-text-center">
                        Digital Class is a improved way for teacher to create and grade quizzes all
                        at the touch of the keyboard. Students will be able to take the quiz and see
                        their grade where ever they are as long as they have internet access.
                    </p>
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
                    <img src={aboutImg} alt="Girl on laptop" className="about-img" uk-img={true} />
                </div>

            </div>

            <div className="uk-flex uk-child-width-1-2@m features-section">
                <div>
                    <div className="uk-flex uk-child-width-1-2@m uk-flex-between feature-cards-wrapper">
                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={makequiz} alt="Feature" uk-img={true} />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Creat Quizzes</h3>
                                <p className="feature-text uk-text-center">Any teacher will be able to easily create mulitple choice quizzes.</p>
                            </div>
                        </div>

                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={grading} alt="Feature" uk-img={true} />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Grade Quizzes</h3>
                                <p className="feature-text uk-text-center">At the click of a button you will see what grade your students got as well as see where they struggles with our quiz analytics.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-flex uk-child-width-1-2@m uk-flex-between feature-cards-wrapper">
                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={quizimage} alt="Feature" uk-img={true} />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Take Quizzes</h3>
                                <p className="feature-text uk-text-center">Students can take a quiz from anywhere on any device.</p>
                            </div>
                        </div>

                        <div className="feature-card uk-card uk-card-default uk-margin-small-top uk-card-body uk-flex uk-flex-column uk-flex-middle">
                            <div className="feature-img uk-flex uk-flex-center uk-flex-middle">
                                <img src={stugrade} alt="Feature" uk-img={true} />
                            </div>
                            <div className="uk-flex uk-flex-column uk-flex-middle">
                                <h3 className="uk-card-title uk-text-center">Check Your Grades</h3>
                                <p className="feature-text uk-text-center">As soon as the student is done taking a quiz they will be able to instantly see their grade.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-flex uk-flex-column uk-flex-middle">
                    <h2 className="uk-title uk-text-center">Features</h2>
                    <img src={featureImg} alt="Guy watching a video" className="about-img" uk-img={true} />
                </div>
            </div>
        </div>
    );
}


export default Homepage