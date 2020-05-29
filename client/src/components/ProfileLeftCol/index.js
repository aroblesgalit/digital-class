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
      <div className="uk-inline-clip uk-transition-toggle uk-light profile-pic-container" tabindex="0">
        <img src="https://via.placeholder.com/300x300" alt="Profile Avatar" className="profile-picture" />
        <div className="uk-position-center">
          <span className="uk-transition-fade edit-pic-btn" uk-icon="icon: pencil"></span>
        </div>
      </div>
      {props.teachers ? (
        <div className="uk-text-small uk-margin-top">
          {props.teachers.join(", ")}
        </div>
      ) : <div></div>}
      {props.subjects ? (
        <div className="uk-margin-top">
          <div className="uk-text-small">Subjects</div>
          {props.subjects.join(", ")}
        </div>
      ) : <div></div>}
      {props.email ? (
        <div className="uk-margin-small-top">
          <div className="uk-text-small">Email</div>
          {props.email}
        </div>
      ) : <div></div>}
    </div>
  )
}

export default ProfileLeftCol;