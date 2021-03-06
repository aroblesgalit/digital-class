import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API'
import './style.css';

function QuizList(props) {
  const [userState, setUserState] = useState();
  useEffect(() => {
    getUser();
    getTeachers();
  }, []);

  const [teachersArray, setTeachersArray] = useState();
  const [shareId, setShareId] = useState();
  const [checkTeachers, setCheckTeachers] = useState([]);
  const [sharedState, setSharedState] = useState(false);

  // get studentid if the user is a student
  async function getUser() {
    if (props.user === "student") {
      const { data: { id } } = await API.getStudentData();
      setUserState(id);
    }
  }

  const getTeachers = () => {
    if (props.user === "teacher") {
      API.getTeachersBySchool(props.school).then(res => { setTeachersArray(res.data) });
    }
  }

  // handle checkbox on modal for teachers sharing quizzes
  function handleCheckbox(e) {
    const newTeachers = [...checkTeachers];
    // if checked, add to newteachers array
    if (e.target.checked) {
      newTeachers.push(e.target.name);
    }
    // if unchecked, remove from newteachers array
    else {
      const index = newTeachers.indexOf(e.target.name)
      newTeachers.splice(index, 1);
    }
    // update state 
    setCheckTeachers(newTeachers);
  }

  const alertShare = () => {
    return (
      <div className="uk-alert uk-alert-success my-alert" uk-alert="true">
        <div className="uk-alert-close" uk-close="true" onClick={()=> {setSharedState(false)}}></div>
        <p>Quiz successfully shared</p>
      </div>
    )
  }

  // when submit is clicked in modal
  const shareQuiz = async (event) => {
    event.preventDefault();
    if (checkTeachers.length !== 0) {
      for (let i = 0; i < checkTeachers.length; i++) {
        await API.addToSharedQuizzes(checkTeachers[i], shareId).then(() => {
          console.log("You shared quiz " + shareId + " with " + checkTeachers[i]);
          // set state to true
          setSharedState(true);
        })
      }
      setCheckTeachers([]);
    }
    else {
      // change to alert
      console.log("You must make a selection first");
    }
  }

  const acceptQuiz = () => {
    console.log("you accepted the quiz");
  }

  const declineQuiz = (quiz) => {
    API.removeASharedQuiz(props.id, quiz).then(res => { console.log("remove response : ", res) }).catch(err => { console.log("remove didn't work ", err) });
  }


  const myRenderCardBottom = (item) => {
    // if the user is a teacher and they are not on the shared tab
    if (props.user === "teacher" && !props.shared) {
      return (
        <div className="uk-flex uk-flex-row uk-flex-around">
          <div>
            <Link to={"/teachers/results/" + item._id}>
              <i className="fas fa-chart-bar" uk-tooltip="View Results"></i>
            </Link>
          </div>
          <i className="fas fa-share-square" uk-tooltip="Share with other teachers" uk-toggle="target: #teachers-update" onClick={() => { setShareId(item._id) }}></i>
          <div id="teachers-update" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Select Teachers</h2>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                {/* if the teachers have been loaded */}
                {teachersArray ?
                  // list teachers with checkboxes
                  teachersArray.map(item => {
                    if (item._id !== props.id) {
                      return (
                        <label key={item._id}><input name={item._id} className="uk-checkbox" type="checkbox" onChange={handleCheckbox} />  {item.name}</label>
                      )
                    }
                  })
                  : ""}
              </div>
              <div className="uk-flex uk-flex-right uk-margin-large-top">
                <button className="uk-button secondaryBtn uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                <button className="uk-button primaryBtn uk-modal-close" type="button" onClick={shareQuiz}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    // is the user is on the shared quizzes page (would only happen for teacher)
    else if (props.shared) {
      return (
        <div className="uk-flex uk-flex-row uk-flex-around">
          <div>

            <Link to={"/teachers/createquiz/" + item._id}>
              <i className="fas fa-eye" uk-tooltip="View/Edit Quiz"></i>
            </Link>
          </div>
          <div>
            <i className="fas fa-check" uk-tooltip="Accept" onClick={() => { acceptQuiz(item._id) }}></i>
          </div>
          <div>
            <i className="fas fa-times" uk-tooltip="Decline" onClick={() => { declineQuiz(item._id) }}></i>
          </div>
        </div>
      )
    }

    // if the user is a student and their id is not in the results, meaning they have not taken the quiz yet
    else if (props.user === "student" && item.students.indexOf(userState) === -1) {
      return (
        <Link to={"/students/quiz/" + item._id} className="quiz-link uk-button">
          Take Quiz
        </Link>
      )
    }
    else if (props.user === "student") {
      return (
        <button className="uk-button uk-button-default" disabled={true}>Quiz Taken</button>
      )
    }
  }


  const myRenderQuizzes = (props) => {
    // if (!props.shared) {
      if (props.quizzes !== undefined) {
        // if the quizzes are not empty
        if (props.quizzes.length > 0) {
          return (
            // create a card for each quiz
            (props.quizzes.map(item => {
              return (
                <div className="uk-card uk-card-small uk-card-body uk-card-default quizCard" key={item._id}>
                  <div className="uk-flex uk-flex-column uk-flex-middle card-top">
                    <div className="uk-card-title card-title">
                      {item.title}
                    </div>
                    <div className="card-subtitle">
                      {item.questions.length + " Questions"}
                    </div>
                  </div>
                  <div className="card-bottom">
                    {myRenderCardBottom(item)}
                  </div>
                </div>
              )
            })))
        }
      // }
      // else if (props.shared) {
      //   if (sharedQuizzesState !== undefined) {
      //     // if the quizzes are not empty
      //     if (sharedQuizzesState.length > 0) {
      //       return (
      //         // create a card for each quiz
      //         (sharedQuizzesState.map(item => {
      //           return (
      //             <div className="uk-card uk-card-small uk-card-body uk-card-default quizCard" key={item._id}>
      //               <div className="uk-flex uk-flex-column uk-flex-middle card-top">
      //                 <div className="uk-card-title card-title">
      //                   {item.title}
      //                 </div>
      //                 <div className="card-subtitle">
      //                   {item.questions.length + " Questions"}
      //                 </div>
      //               </div>
      //               <div className="card-bottom">
      //                 {myRenderCardBottom(item)}
      //               </div>
      //             </div>
      //           )
      //         })))
      //     }
      //   }
      // }
      // if the quizzes have been loaded

      else {
        return (
          <div>No quizzes to display</div>
        )
      }
    }
  }



  return (
    <div>
      {sharedState ? alertShare() : ""}
      <div className="uk-flex uk-flex-between">
      <div className="uk-flex uk-flex-wrap">
        {myRenderQuizzes(props)}
      </div>
      {props.user === "teacher" && !props.shared ?
        <div className="createBtnContainer">
          <Link to="/teachers/createquiz">
            <span uk-icon="icon: plus" className="uk-flex uk-flex-center uk-flex-middle createBtn"></span>
          </Link>
        </div>
        : <div></div>
      }
    </div>
    </div>
    
  )
}

export default QuizList;