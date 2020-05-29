import React from 'react';
import './style.css';

function StudentList(props) {
  props.students.sort((a, b) => (a.name > b.name) ? 1 : -1);
  return (
    <div className="uk-flex uk-flex-wrap">
      {props.students ? props.students.map(item => {
        return (
          <div key={item._id} className="uk-card uk-card-small uk-card-body uk-card-default uk-text-center studentCard">
            <img className="uk-border-circle" src="https://via.placeholder.com/300x300" alt="Avatar" />
            <div className="studentName">{item.name}</div>
            <div className="studentInfo">{item.email}</div>
          </div>
        )
      }) : <div>No students to display</div>}
    </div>


  )
}

export default StudentList;