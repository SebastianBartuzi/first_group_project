// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// React router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navbar from './Components/navbar';
import PrivateRoute from "./Routes/PrivateRoute";

import privatePage from "./Components/Pages/privatePage";
import loginPage from "./Components/Pages/loginPage";
import registerPage from "./Components/Pages/registerPage";
import { useState } from "react";

function App() {
  return (
      <div className="App">
        <Router>
        <Navbar/>
          <Switch>
            <PrivateRoute exact path="/private" component={privatePage}/>
            <Route exact path="/private">
              <h1>Project happy</h1>
            </Route>
            <Route exact path="/login" component={loginPage}/>
            <Route exact path="/register" component={registerPage}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
