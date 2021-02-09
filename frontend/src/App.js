// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// React router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navbar from './Components/navbar';
import PrivateRoute from "./Routes/PrivateRoute";

import privatePage from "./Components/Pages/privatePage";
import loginPage from "./Components/Pages/loginPage";
import registerPage from "./Components/Pages/registerPage";
import forgotPasswordPage from "./Components/Pages/forgotPasswordPage";
import resetPasswordPage from "./Components/Pages/resetPasswordPage";
import deleteAccountPage from "./Components/Pages/deleteAccountPage";
import changeEmailPage from "./Components/Pages/changeEmailPage";
import ChangeMailRequestPage from "./Components/Pages/changeMailRequestPage";
import LandingPage from "./Components/Pages/landingPage";

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
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/login" component={loginPage}/>
            <Route exact path="/register" component={registerPage}/>
            <Route exact path="/forgotpassword" component={forgotPasswordPage}/>
            <Route exact path="/resetpassword/:resetToken" component={resetPasswordPage}/>
            <Route exact path="/delete" component={deleteAccountPage}/>
            <Route exact path="/changemail" component={changeEmailPage}/>
            <Route exact path="/changemailrequest/:resetToken" component={ChangeMailRequestPage}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
