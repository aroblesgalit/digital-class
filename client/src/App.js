import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import CreateQuiz from './pages/CreateQuiz';
import SignUpForm from './components/SignUpForm';
import StudentLogin from "./components/StudentLogin";
import TestMember from "./pages/TestMember";
import PrivateRoute from "./components/PrivateRoute";
import TeacherProfile from "./pages/TeacherProfile";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <TeacherProfile />
          </Route>
          <Route exact path="/teachers/createquiz">
            <CreateQuiz />
          </Route>
          <Route exact path='/teachers/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/students/login'>
            <StudentLogin />
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
