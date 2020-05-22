import React from 'react';
import './style.css';


function SignUpForm(props) {
    return (
        <div className='signupWrapper'>
            <h3>Teacher SignUp:</h3>
            <form className='uk-form-stacked uk-position-relative ' uk-height-viewport='expand: true'>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Email:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='email' type='text' placeholder='kelseydoe@email.com' />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Password:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='password' type='text' />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Name:</label>
                    <div className='uk-form-controls'>
                        <input className="uk-input uk-form-width-medium" id='name' type='text' />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label uk-text'>Subject:</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input uk-form-width-medium' id='Subject' type='text' />
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
                                <option value=''>Tx</option>
                                <option value=''>DC</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" for="form-stacked-select">Select</label>
                    <div className="uk-form-controls">
                        <select className="uk-select-medium" id="form-stacked-select">
                            <option>Bowie High School</option>
                            <option>Westlake High School</option>
                        </select>
                    </div>
                </div>
                <button className='uk-button' id='loginBtn'>Log in</button>
                <button className='uk-button' id='signupBtn'>Sign up</button>
            </form>
        </div>
    );

}


export default SignUpForm;