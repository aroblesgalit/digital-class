import React from 'react';
import { useParams } from 'react-router-dom';
import ResultsTable from '../components/ResultsTable';

function QuizResults() {
  const {id} = useParams();

 return(
   <div className="results-container">
     <ResultsTable id={id} />
  </div>
 );
}

export default QuizResults;
