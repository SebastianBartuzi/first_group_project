// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// React router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navbar from './Components/navbar'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <h1>Project happy</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
