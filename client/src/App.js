import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";
import QuizForm from './components/QuizForm';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <QuizForm/>
        {/* <Switch>
          <Route exact path={["/"]}>
            <Search/>
          </Route>
        </Switch> */}
      <Footer/>

      </div>
    </Router>
  );
}

export default App;
