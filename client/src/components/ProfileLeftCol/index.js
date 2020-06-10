import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";
import studentImg from "../../images/studentAvatar.svg";
import teacherImg from "../../images/teacherAvatar.svg";
// import TeacherProfile from "../../pages/TeacherProfile";

function ProfileLeftCol(props) {
  // Authenticated user's state
  const [userState, setUserState] = useState({});

  // Current state of teachersList array
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (props.type === "teacher") {
        const data = await API.getTeacher();
        setUserState({
          type: props.type,
          imageUrl: data.data.imageUrl
        })
      } else {
        const data = await API.getStudentData();
        // console.log("Loading student's data...", data);
        setUserState({
          type: props.type,
          imageUrl: data.data.imageUrl,
          teachers: data.data.teachers,
          school: data.data.school
        })
        // console.log("Printing data.data.teachers from getStudentData()...", data.data.teachers);
        const teachers = await API.getTeachersBySchool(data.data.school);
        setTeachers(teachers.data);
        // console.log("Printing teachers.data...", teachers.data);
      }
    }
    loadData();
  }, []);

  const [checkTeachers, setCheckTeachers] = useState([]);
  // Handle for checking checkboxes for teachers
  function handleCheckbox(e) {
    // console.log('checked', e.target.checked);
    // console.log('name', e.target.name);
    const newTeachers = [...checkTeachers];
    if (e.target.checked) {
      newTeachers.push(e.target.name);
    }
    else {
      const index = newTeachers.indexOf(e.target.name)
      newTeachers.splice(index, 1);
    }
    setCheckTeachers(newTeachers);
  }
  // Update student's list of teachers in the db
  function saveTeachers(e) {
    e.preventDefault();
    API.updateStudentsTeachers(checkTeachers)
      .then(res => {
        console.log("Student's teachers updated...printing new list", res);
      })
      .catch(err => {
        console.log("Oh no! Something went wrong while updating the student's teachers list...", err);
      })
    window.location.reload(false);
  }

  let imageUrlRef = useRef();
  // Update user's imageUrl field with the new url
  const handleSave = async (e) => {
    e.preventDefault();

    // Make a put request to update user's data with the image
    if (props.type === "teacher") {
      await API.updateTeacher(props.id, {
        imageUrl: imageUrlRef.current.value
      })
    } else if (props.type === "student") {
      await API.updateStudent(props.id, {
        imageUrl: imageUrlRef.current.value
      })
    }
    setUserState({
      type: props.type,
      imageUrl: imageUrlRef.current.value
    })
  }

  //initialize i for incrememnting teacher emails in props
  var i = -1;
  return (

    <div className="left-col-container uk-align-left uk-flex uk-flex-column uk-padding" >
      <div className="uk-text-large">
        {props.name}
      </div>
      <div className="uk-text-small uk-margin-bottom">
        {props.school}
      </div>
      <div className="uk-flex uk-flex-column image-and-info">
        <div className="uk-inline-clip uk-transition-toggle uk-light profile-pic-container uk-flex uk-flex-center uk-flex-middle" tabIndex="0">
          <img src={userState.imageUrl || (props.type === "teacher" ? teacherImg : studentImg)} alt="Profile Avatar" className="profile-picture" />
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
                <button className="uk-button uk-modal-close uk-margin-small-right secondaryBtn" type="button">Cancel</button>
                <button className="uk-button uk-modal-close primaryBtn" type="button" onClick={handleSave}>Save</button>
              </p>
            </form>
          </div>
        </div>
        <div className="uk-flex uk-flex-column">
          {props.teachers ? (
            <div className="uk-text-small uk-margin-top user-info">
              <div className="uk-flex uk-flex-middle">
                <div className="uk-text-small uk-margin-small-right">Teachers</div>
                <button uk-icon="icon: pencil; ratio: .9" type="button" uk-toggle="target: #teachers-update"></button>
              </div>
              <div id="teachers-update" uk-modal="true">
                <div className="uk-modal-dialog uk-modal-body">
                  <h2 className="uk-modal-title">Update Teachers</h2>
                  <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    {
                      teachers && teachers.length > 0 ? (
                        teachers.map(teacher => {
                          return <label key={teacher._id}>
                            <input
                              name={teacher._id}
                              className="uk-checkbox"
                              type="checkbox"
                              onClick={handleCheckbox}
                            />
                            {teacher.name}
                          </label>
                        })
                      ) : <p className="uk-text-danger">No teachers found under this school.</p>
                    }

                  </div>
                  <div className="uk-flex uk-flex-right uk-margin-large-top">
                    <button className="uk-button secondaryBtn uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                    <button className="uk-button primaryBtn" type="button" onClick={saveTeachers}>Save</button>
                  </div>
                </div>
              </div>
              {props.teachers.map(item => {
                i++;
                return (
                  <div uk-tooltip={props.teacheremails[i]} key={item}>{item}</div>
                )
              })}
              {/* {props.teachers.join(", ")} */}
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
      </div>
    </div>
  )
}

export default ProfileLeftCol;