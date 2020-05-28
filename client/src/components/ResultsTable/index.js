import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import API from '../../utils/API';
const Chart = require('chart.js');

function ResultsTable(props) {
  // result state is an array of objects where each object is an individual result
  const [resultState, setResultState] = useState([{ _id: 1 }]);
  // Quiz State is an array of correct answers
  const [quizState, setQuizState] = useState({});
  // tab state contains the active tab
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
    const labels = []
    const bgColors = [];
    const data = [];
    const borderColors = [];
    for (let i = 0; i<quizState.length; i++) {
      labels.push("Q" + (i+1));
      bgColors.push('rgb(42, 89, 143, 0.2)');
      borderColors.push('rgb(42, 89, 143, 1)');
      // for each student
      let thisans = 0;
      for (let j=0; j<resultState.length; j++) {
        // if they answered correctly, increment data[i];
        if (quizState[i] === resultState[j].answers[i]){
          thisans++;
        }
      }
      data.push(thisans);
    }

    // if there are more than 12 questions, add responsive styling to chart and nav-icons
    if (data.length > 12) {
      document.getElementById("chart-container").classList.add("chart-container-responsive");
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# Correct Students',
          data: data,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
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
          <div className="back" onClick={() => {window.location.replace("/teachers/profile")}}>
            {"< Back"}
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

        ) : <div id="chart-container">
            <canvas id="myChart"></canvas>
          </div>}
      </div>

    </div>
  )
}

export default ResultsTable;