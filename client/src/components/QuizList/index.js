import React, { useEffect, useState } from 'react';
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

  async function getUser() {
    if (props.user === "student") {
      const { data: { id } } = await API.getStudentData();
      setUserState(id);
    }
  }

  const getTeachers = () => {
    console.log("getting teachers by school")
    API.getTeachersBySchool(props.school).then(res => {setTeachersArray(res.data)});
  }

  function handleCheckbox(e) {
    const newTeachers = [...checkTeachers];
    if (e.target.checked) {
        newTeachers.push(e.target.name);
    }
    else {
        const index = newTeachers.indexOf(e.target.name)
        newTeachers.splice(index, 1);
    }
    setCheckTeachers(newTeachers);
}


  const shareQuiz = () => {
    if (checkTeachers.length !== 0){
      console.log("You shared quiz " + shareId + " with " + checkTeachers);
    }
    else {
      console.log("You must make a selection first")
    }
  }


  const myRender = (props) => {
    if (props.quizzes !== undefined) {
      if (props.quizzes.length > 0) {
        return (
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
                  {props.user === "teacher" ?
                    <div className="uk-flex uk-flex-row uk-flex-around">
                      <div>
                        <Link to={"/teachers/results/" + item._id}>
                          <i className="fas fa-chart-bar" uk-tooltip="View Results"></i>
                        </Link>
                      </div>
                      <i className="fas fa-share-square" uk-tooltip="Share with other teachers" uk-toggle="target: #teachers-update" onClick={() => {setShareId(item._id)}}></i>
                      <div id="teachers-update" uk-modal="true">
                        <div className="uk-modal-dialog uk-modal-body">
                          <h2 className="uk-modal-title">Select Teachers</h2>
                          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            {
                              /* replace <label><input>s below by mapping through the list of teachers */
                              /* add checked="true" for teachers in this student's teachers array */
                            }
                            
                            {teachersArray ?
                            teachersArray.map(item => { if (item._id !== props.id){
                              return(
                                <label key={item._id}><input name={item._id} className="uk-checkbox" type="checkbox" onChange={handleCheckbox} />  {item.name}</label>
                              )
                            }
                              
                              })
                             : <div></div> }
                            
                            
                          </div>
                          <div className="uk-flex uk-flex-right uk-margin-large-top">
                            <button className="uk-button secondaryBtn uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                            <button className="uk-button primaryBtn" type="button" onClick={() => shareQuiz()}>Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    : ""}
                  {props.user === "student" && item.students.indexOf(userState) === -1 ?
                    <Link to={"/students/quiz/" + item._id} className="quiz-link uk-button">
                      Take Quiz
                    </Link>
                    : props.user === "student" && <button class="uk-button uk-button-default" disabled={true}>Quiz Taken</button>}
                </div>
              </div>
            )
          }))
        )
      }
      else {
        return (
          <div>No quizzes to display</div>
        )
      }
    }
  }

  return (
    <div className="uk-flex uk-flex-between">
      <div className="uk-flex uk-flex-wrap">
        {myRender(props)}
      </div>
      {props.user === "teacher" ?
        <div className="createBtnContainer">
          <Link to="/teachers/createquiz">
            <span uk-icon="icon: plus" className="uk-flex uk-flex-center uk-flex-middle createBtn"></span>
          </Link>
        </div>
        : <div></div>
      }
    </div>
  )
}

export default QuizList;