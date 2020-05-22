// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import SignUp from './pages/SignUp';
import SignUpForm from "./components/SignUpForm/SignUpForm";

function App() {
  return (
    <Router>
        <Route exact path='/'>
          <SignUpForm />
        </Route>
  
    </Router>
  );
}

export default App;
