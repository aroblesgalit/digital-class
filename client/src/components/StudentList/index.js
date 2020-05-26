import React from 'react';
import './style.css';

function StudentList(props) {
  return (
    <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid="true">
      {props.students ? props.students.map(item => {
        return (
      <div key={item.id}>
        <div className="uk-card uk-card-default uk-card-body">{item.name}</div>
      </div>
        )
      }) : <div></div>}
    </div>


  )
}

export default StudentList;