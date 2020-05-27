import React from 'react';
import './style.css';

function ProfileLeftCol(props) {
  return (

    <div className="left-col-container uk-align-left uk-flex uk-flex-column uk-padding uk-padding-left" >
      <div className="uk-text-large">
        {props.name}
      </div>
      <div className="uk-text-small uk-margin-bottom">
        {props.school}
      </div>
      <img src="https://via.placeholder.com/300x300" alt="Profile Picture" className="profile-picture" />
      {props.teachers ? (<div className="uk-text-small uk-margin-top">
        {props.teachers.join(", ")}
      </div>) : <div></div> }
      {props.subject ? (<div className="uk-text-small uk-margin-top">
        {props.subject}
      </div>) : <div></div> }
      {props.email ? (<div className="uk-text-small uk-margin-bottom">
        {props.email}
      </div>) : <div></div>}
    </div>
  )
}

export default ProfileLeftCol;