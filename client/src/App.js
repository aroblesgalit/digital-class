import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Jumbotron/>
        <Switch>
          <Route exact path={["/"]}>
            <Search/>
          </Route>
          <Route exact path='/teachers/signup'>
            <SignUpForm />
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
