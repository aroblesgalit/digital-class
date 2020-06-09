import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API'
import './style.css';

function ShareList(props) {

  useEffect(() => {
    getSharedQuizzes()
  }, []);

  const [sharedQuizzesState, setSharedQuizzesState] = useState([]);

  const getSharedQuizzes = async () => {
    const shared = [];
    for (let i = 0; i < props.quizIds.length; i++) {
      await API.getQuizById(props.quizIds[i]).then(sharedRes => shared.push(sharedRes.data))
    }
    setSharedQuizzesState(shared);
  }

  const acceptQuiz = (id) => {
    console.log("you accepted the quiz");
    API.getQuizById(id).then(quiz => {
      const newQuiz = {
        teacher: props.id,
        title: quiz.data.title,
        timeLimit: quiz.data.timeLimit,
        questions: quiz.data.questions
      }
      API.createQuiz(newQuiz)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      API.removeASharedQuiz(props.id, quiz).then(res => { console.log("remove response : ", res) }).catch(err => { console.log("remove didn't work ", err) });
      const newQuizzes = [...sharedQuizzesState];
      const result = newQuizzes.filter(item => item._id !== quiz);
      setSharedQuizzesState(result);

    })

  }

  const declineQuiz = (quiz) => {
    console.log("You declined the quiz");
    API.removeASharedQuiz(props.id, quiz).then(res => { console.log("remove response : ", res) }).catch(err => { console.log("remove didn't work ", err) });
    const newQuizzes = [...sharedQuizzesState];
    const result = newQuizzes.filter(item => item._id !== quiz);
    setSharedQuizzesState(result);
  }


  const myRenderCardBottom = (item) => {
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


  const myRenderQuizzes = () => {
    if (sharedQuizzesState !== undefined) {
      // if the quizzes are not empty
      if (sharedQuizzesState.length > 0) {
        return (
          // create a card for each quiz
          (sharedQuizzesState.map(item => {
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
    }
    else {
      return (
        <div>No quizzes to display</div>
      )
    }
  }



  return (
    <div className="uk-flex uk-flex-between">
      <div className="uk-flex uk-flex-wrap">
        {myRenderQuizzes()}
      </div>
    </div>
  )
}

export default ShareList;