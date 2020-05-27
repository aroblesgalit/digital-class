import React from 'react';
import { useParams } from 'react-router-dom';
import ResultsTable from '../components/ResultsTable';

const user = {
  name: "Ryan Gautier",
  school: "Centennial High School",
  subject: "AP Physics",
  email: "ryangautier2@gmail.com"
}


function QuizResults() {
  const {id} = useParams();

 return(
   <div>
     <ResultsTable id={id} />
  </div>
 );
}

export default QuizResults;
