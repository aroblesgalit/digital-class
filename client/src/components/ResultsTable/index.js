import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import API from '../../utils/API';
const Chart = require('chart.js');

function ResultsTable(props) {
  const [resultState, setResultState] = useState([{ _id: 1 }]);
  const [quizState, setQuizState] = useState({});
  const [tabState, setTabState] = useState({ tab: "table" });

  useEffect(() => {
    getRestuls();
    getQuiz();
  }, []);

  useEffect(() => {
    if (tabState.tab === "chart") {
      renderChart();
    }
  }, [tabState.tab]);

  const getRestuls = async () => {
    await API.getResultsByQuiz(props.id).then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        await API.getStudentById(res.data[i].student).then(student => res.data[i].name = student.data.name);
      }
      setResultState(res.data);

    })
  };

  const getQuiz = async () => {
    await API.getQuizById(props.id).then(res => {
      console.log(res);
      const answers = [];
      res.data.questions.map(item => {
        answers.push(item.answer);
      });
      setQuizState(answers);
    });
  }

  const handleTabChange = (tab) => {
    setTabState({ ...tabState, tab: tab });
  }


  // set up chart
  const renderChart = () => {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



  return (
    <div>
      <div className="result-wrapper">
        <div className="uk-flex uk-flex-between">
          <div>
            <Link to="teachers/profile">
              {"< Back"}
            </Link>
          </div>
          <div>
            <div className="nav-icon" onClick={() => handleTabChange("table")}>
              <i className="fas fa-table"></i>
            </div>
            <div className="nav-icon" onClick={() => handleTabChange("chart")}>
              <i className="fas fa-chart-bar"></i>
            </div>
          </div>
        </div>
        {tabState.tab === "table" ? (
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

        ) : <div>
            <canvas id="myChart"></canvas>
          </div>}
      </div>

    </div>
  )
}

export default ResultsTable;