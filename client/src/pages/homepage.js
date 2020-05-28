

import React from "react";
import { List, ListItem } from "../components/List";

function Homepage() {
    return (
        <div className="uk-padding-large">
            <div className="uk-grid">

                <div className="uk-width-1-2">
                    <h1 className="uk-text-large uk-text-center">Digital Class</h1>
                    <p className="uk-text-center">Digital Class is a improved way for teacher to create and grade quizzes all at the touch of the keyboard. Students will be able to take the quiz and see their grade where ever they are as long as they have internet access.   
                </p> <div className="uk-grid">
                        <div className="uk-width-1-2">
                            <div className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">  <div className="member-info">
                                    <a href="https://github.com/jroenitz" target="_blank" rel="noopener noreferrer">
                                        <img className="member-thumbnail" src="https://avatars0.githubusercontent.com/u/61602629?s=460&u=1995a6a23ecd93be57fc6a84ac8f61d205401101&v=4" alt="Jordan Roenitz" />
                                    </a>
                                    <div>Jordan<br />Roenitz</div>
                                </div></h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              
                            </div>
                        </div>
                        <div className="uk-width-1-2">
                            <div className="uk-card uk-card-default uk-card-body">
                                <h3 className="uk-card-title">  <div className="member-info">
                                    <a href="https://github.com/jroenitz" target="_blank" rel="noopener noreferrer">
                                        <img className="member-thumbnail" src="https://avatars0.githubusercontent.com/u/61602629?s=460&u=1995a6a23ecd93be57fc6a84ac8f61d205401101&v=4" alt="Jordan Roenitz" />
                                    </a>
                                    <div>Jordan<br />Roenitz</div>
                                </div></h3>
                                <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-width-1-2"><div className="uk-margin-large uk-background-secondary"></div></div>
                <div className="uk-width-1-2">
                    <div className="uk-margin-large-top uk-card uk-card-default uk-card-body"><div className="uk-grid"><div className="uk-width-1-6 uk-background-secondary"></div><div className="uk-width-5-6"> <h3 className="uk-card-title"> Create Quizzes </h3>Any teacher will be able to easily create mulitple choice quizzes.  </div></div></div>
                    <div className="uk-margin-large-top uk-card uk-card-default uk-card-body"><div className="uk-grid"><div className="uk-width-1-6 uk-background-secondary"></div><div className="uk-width-5-6"> <h3 className="uk-card-title"> Grade Quizzes </h3>At the click of a butt </div></div></div>
                    <div className="uk-margin-large-top uk-card uk-card-default uk-card-body"><div className="uk-grid"><div className="uk-width-1-6 uk-background-secondary"></div><div className="uk-width-5-6"> <h3 className="uk-card-title"> Take Quizzes </h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div></div></div>
                    <div className="uk-margin-large-top uk-card uk-card-default uk-card-body"><div className="uk-grid"><div className="uk-width-1-6 uk-background-secondary"></div><div className="uk-width-5-6"> <h3 className="uk-card-title"> Check Your Grades </h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div></div></div>
                </div>
                <div className="uk-width-1-2"><h2 className="uk-title uk-text-center">Features</h2><div className="uk-margin-large"><div className="uk-background-secondary" style={{ height: "400px" }}></div></div></div>


            </div>
        </div>

    );
}


export default Homepage