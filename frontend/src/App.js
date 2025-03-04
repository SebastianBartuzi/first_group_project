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
import MoodTrackerPage from "./Components/Pages/moodTrackerPage";
import CatGenerator from "./Components/Pages/catGenerator";
import WeeklyPoll from "./Components/Pages/weeklyPollPage";
import Resources from "./Components/Pages/resources";
import JokeGenerator from "./Components/Pages/jokePage";
import RiddlePage from "./Components/Pages/riddlePage";
import QuotesPage from "./Components/Pages/quotesPage";
import InspirobotGen from "./Components/Pages/inspirobotPage";
import Quiz from "./Components/Pages/quizPage";
import FavoritesPage from "./Components/Pages/favPages";
import PoliticalTest from "./Components/Pages/politicalTest";

function App() {
  return (
      <div className="App">
        <Router>
        <Navbar/>
          <Switch>
            <PrivateRoute exact path="/profile" component={privatePage}/>
            <PrivateRoute exact path="/moodtracker" component={MoodTrackerPage}/>
            <PrivateRoute exact path="/favorites" component={FavoritesPage}/>
            <Route exact path="/weeklypoll" component={WeeklyPoll}/>


            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/login" component={loginPage}/>
            <Route exact path="/register" component={registerPage}/>
            <Route exact path="/forgotpassword" component={forgotPasswordPage}/>
            <Route exact path="/resetpassword/:resetToken" component={resetPasswordPage}/>
            <Route exact path="/delete" component={deleteAccountPage}/>
            <Route exact path="/changemail" component={changeEmailPage}/>
            <Route exact path="/changemailrequest/:resetToken" component={ChangeMailRequestPage}/>
            <Route exact path="/catgenerator" component={CatGenerator}/>
            <Route exact path="/resources" component={Resources}/>
            <Route exact path="/jokes" component={JokeGenerator}/>
            <Route exact path="/riddle" component={RiddlePage}/>
            <Route exact path="/quotes" component={QuotesPage}/>
            <Route exact path="/inspiroquotes" component={InspirobotGen}/>
            <Route exact path="/quizzes" component={Quiz}/>
            <Route exact path="/politicaltest" component={PoliticalTest}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
