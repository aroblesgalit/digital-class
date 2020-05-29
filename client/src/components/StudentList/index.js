import React from 'react';
import './style.css';
import studentImg from "../../images/studentAvatar.svg";

function StudentList(props) {
  props.students.sort((a, b) => (a.name > b.name) ? 1 : -1);
  return (
    <div className="uk-flex uk-flex-wrap">
      {props.students ? props.students.map(item => {
        console.log(props.students);
        return (
          <div key={item._id} className="uk-card uk-card-small uk-card-body uk-card-default uk-text-center uk-flex uk-flex-column uk-flex-middle studentCard">
            <div className="uk-flex uk-flex-middle img-container">
              <img className="uk-responsive-width" src={item.imageUrl || studentImg} alt="Avatar" />
            </div>
            <div className="studentName">{item.name}</div>
            <div className="studentInfo">{item.email}</div>
          </div>
        )
      }) : <div>No students to display</div>}
    </div>


  )
}

export default StudentList;