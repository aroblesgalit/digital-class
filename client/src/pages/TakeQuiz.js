import React from 'react';
import { useParams } from 'react-router-dom';
import StudentQuiz from '../components/StudentQuiz';

function TakeQuiz() {

  const {id} = useParams();
 return(
     <StudentQuiz id={id} />
 );
}

export default TakeQuiz;