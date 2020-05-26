import React from 'react';
import './style.css';

function StudentList(props) {
  props.students.sort((a,b) => (a.name > b.name) ? 1 : -1);
  return (
    <div className="uk-grid-column-small uk-grid-row-large  uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1 uk-text-center" uk-grid="true">
      {props.students ? props.students.map(item => {
        return (
      <div key={item.id}>
        <div className="uk-card uk-card-default uk-card-small uk-card-body uk-text-center uk-text-small">
          <div>{item.name}</div>
          <div>{item.email}</div>
        </div>
      </div>
        )
      }) : <div>No students to display</div>}
    </div>


  )
}

export default StudentList;