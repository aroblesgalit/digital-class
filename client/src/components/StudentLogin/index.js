import React from 'react';
import './style.css';

function StudentLogin() {
 return(
    <div className='loginWrapper'>
    <h3>Student Login:</h3>
    <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
        <div className='uk-margin'>
            <label className='uk-form-label uk-text'>Email:</label>
            <div className='uk-form-controls'>
                <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='student@email.com' />
            </div>
        </div>
        <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Password:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='password' type='text' />
                    </div>
                </div>
                <button className='uk-button' id='loginBtn'>Log in</button>
        </form>
        </div>
 );
}

export default StudentLogin;