import React, { useState, useRef } from "react";
import "./style.css";
import API from "../../utils/API";

function ProfileLeftCol(props) {

  const imageUrlRef = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    const imageUrl = imageUrlRef.current.value;

    // Make a put request to update user's data with the image
    if (props.type === "teacher") {
      const teacherData = await API.updateTeacher(props.id, {
        imageUrl: imageUrl
      })
      console.log(teacherData);
    } else if (props.type === "student") {
      const studentData = await API.updateStudent(props.id, {
        imageUrl: imageUrl
      })
      console.log(studentData);
    }
  }

  return (

    <div className="left-col-container uk-align-left uk-flex uk-flex-column uk-padding uk-padding-left" >
      <div className="uk-text-large">
        {props.name}
      </div>
      <div className="uk-text-small uk-margin-bottom">
        {props.school}
      </div>
      <div className="uk-inline-clip uk-transition-toggle uk-light profile-pic-container" tabIndex="0">
        <img src="https://via.placeholder.com/300x300" alt="Profile Avatar" className="profile-picture" />
        <div className="uk-position-center">
          <span className="uk-transition-fade edit-pic-btn" uk-icon="icon: pencil" uk-toggle="target: #image-url-input"></span>
        </div>
      </div>
      <div id="image-url-input" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body">
          <button className="uk-modal-close-default" type="button" uk-close="true"></button>
          <form className="uk-form-stacked uk-position-relative studentForm" uk-height-viewport="expand: true">
            <h3>Enter a hyperlink for your profile picture</h3>
            <div className="uk-margin">
              <label className="uk-form-label uk-text">Image Url</label>
              <div className="uk-form-controls">
                <input className="uk-input uk-form-width-medium stuInput" id="imageUrl" type="text" placeholder="https://www.image.com/image.png" ref={imageUrlRef} />
              </div>
            </div>
            <p className="uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
              <button className="uk-button uk-button-primary uk-modal-close" type="button" onClick={handleSave}>Save</button>
            </p>
          </form>
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