import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CreateQuiz from './pages/CreateQuiz';
import SignUpForm from './components/SignUpForm';
import Login from "./components/Login";
import TakeQuiz from "./pages/TakeQuiz";
import TeacherProfile from "./pages/TeacherProfile";
import QuizResults from "./pages/QuizResults";
import Homepage from "./pages/homepage";
import StudentProfile from "./pages/StudentProfile";


function App() {
  
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path={["/teachers/createquiz/:id", "/teachers/createquiz"]}>
            <CreateQuiz />
          </Route>
          <Route exact path='/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/teachers/profile'>
            <TeacherProfile />
          </Route>
          <Route exact path='/students/profile'>
            <StudentProfile />
          </Route>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route path='/students/quiz/:id'>
            <TakeQuiz />
          </Route>
          <Route path="/teachers/results/:id">
            <QuizResults />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
