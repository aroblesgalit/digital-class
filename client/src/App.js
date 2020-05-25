import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import SignUpForm from './components/SignUpForm';
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            {/* <Search/> */}
          </Route>
          <Route exact path='/teachers/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/students/login'>
            <StudentLogin />
          </Route>
          <Route exact path='/teachers/login'>
            <TeacherLogin />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
