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
// import LoginForm from "./components/LogInForm";
import Login from "./components/Login";
import TestMember from "./pages/TestMember";
import PrivateRoute from "./components/PrivateRoute";
import TakeQuiz from "./pages/TakeQuiz";

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
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route path='/students/quiz/:id'>
            <TakeQuiz />
          </Route>
          <PrivateRoute path="/test-member">
            <TestMember />
          </PrivateRoute>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
