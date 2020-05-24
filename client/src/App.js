import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import QuizForm from './components/QuizForm';
import SignUpForm from './components/SignUpForm';
import StudentLogin from "./components/StudentLogin";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <QuizForm/>
          </Route>
          <Route exact path='/teachers/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/students/login'>
            <StudentLogin />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
