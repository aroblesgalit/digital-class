import React, { useEffect, useState } from 'react';
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

  // on load, get results and quiz
  useEffect(() => {
    getRestuls();
    getQuiz();
  }, []);

  // when the tab changes
  useEffect(() => {
    // render the chart if the active tab is 'chart'
    if (tabState.tab === "chart") {
      renderChart();
    }
  }, [tabState.tab]);


  const getRestuls = async () => {
    // get results based on quiz id
    await API.getResultsByQuiz(props.id).then(async (res) => {
      // for each student id in the response
      for (let i = 0; i < res.data.length; i++) {
        // get student info based on student id and add their name to res.data object
        await API.getStudentById(res.data[i].student).then(student => res.data[i].name = student.data.name);
      }
      // update state
      setResultState(res.data);

    })
  };
  

  const getQuiz = async () => {
    // get quiz answers based on id for results chart
    await API.getQuizById(props.id).then(res => {
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
    // initialize arrays for rendering chart
    const labels = [];
    const bgColors = [];
    const data = [];
    const borderColors = [];
    for (let i = 0; i<quizState.length; i++) {
      // set label to Q#
      labels.push("Q" + (i+1));
      // set color of bar
      bgColors.push('rgb(42, 89, 143, 0.2)');
      // set color of border
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

    // render chart
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
          {/* back button to return to teacher profile page */}
          <div className="back" onClick={() => {window.location.replace("/teachers/profile")}}>
            {"< Back"}
          </div>
          {/* nav area with tabs */}
          <nav>
            <div className="nav-icon" onClick={() => handleTabChange("table")}>
              <i className="fas fa-table"></i>
            </div>
            <div className="nav-icon" onClick={() => handleTabChange("chart")}>
              <i className="fas fa-chart-bar"></i>
            </div>
          </nav>
        </div>
        {/* if the table tab is active */}
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
              {/* map over results to build table */}
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

          // if the table tab is not active
        ) : <div id="chart-container">
            <canvas id="myChart"></canvas>
          </div>}
      </div>

    </div>
  )
}

export default ResultsTable;