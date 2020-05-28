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
// import LoginForm from "./components/LogInForm";
import Login from "./components/Login";
import TestMember from "./pages/TestMember";
import PrivateRoute from "./components/PrivateRoute";
import TeacherProfile from "./pages/TeacherProfile";
import QuizResults from "./pages/QuizResults";
import homepage from "./pages/homepage";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <SignUpForm />
          </Route>
          <Route exact path="/teachers/createquiz">
            <CreateQuiz />
          </Route>
          <Route exact path='/teachers/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/teachers/profile'>
            <TeacherProfile />
          </Route>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route path="/results/:id">
            <QuizResults />
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
