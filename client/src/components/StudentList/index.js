import React from 'react';
import './style.css';

function studentList() {
  return (
    <div className="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid="true">
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item</div>
      </div>
    </div>


  )
}

export default studentList;