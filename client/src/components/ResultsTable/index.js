import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import API from '../../utils/API';

function ResultsTable(props) {
  const [resultState, setResultState] = useState([{_id: 1}]);
  useEffect(() => {
    getRestuls();
  }, []);
  const getRestuls = async () => {
    await API.getResultsByQuiz(props.id).then(async (res) => {
      for (let i = 0; i<res.data.length; i++) {
        await API.getStudentById(res.data[i].student).then(student => res.data[i].name = student.data.name);
      }
      setResultState(res.data);
    
  })
};


  return (
    <div className="result-wrapper">
      <div className="uk-flex uk-flex-between">
        <div>
          <Link to="teachers/profile">
            {"< Back"}
          </Link>
        </div>
        <div>
          <div className="nav-icon">
            <i class="fas fa-table"></i>
          </div>
          <div className="nav-icon">
            <i class="fas fa-chart-bar"></i>
          </div>
        </div>        
      </div>
      <table className="uk-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {resultState.map(item => {
            return (
              <tr key={item._id}>
                <td>
                  <div className="name">
                    {item.name}
                  </div>
                </td>
                <td>{item.score}</td>
                <td>
                  <div className="feedback">
                    {item.feedback}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}

export default ResultsTable;