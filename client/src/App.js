import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Switch>
          <Route exact path={["/", "/books"]}>
            <Books />
          </Route>
        </Switch> */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
