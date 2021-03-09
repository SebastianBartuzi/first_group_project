import "../../Styles/form.css";
import React from "react";
import axios from 'axios';

class Quiz extends React.Component {
  constructor() {
      super();
      this.state = {
          mainPage : true,
          quizInProgress : false,
          resultToShow : false,
          chosenCategory : "",
          categoryNumber : 0,
          questionNumber : 0,
          quest : ["", "", "", "", "", "", "", "", "", "", "", ""],
          incorrectAnswers : ["", "", ""],
          correctAnswerPos : 0,
          points : 0,
          strike : 1,
          done: false,
      }
  }

  backToMenu() {
    this.setState({mainPage: true});
    this.setState({resultToShow: false});
    this.setState({chosenCategory: ""});
    this.setState({categoryNumber: 0});
    this.setState({questionNumber: 0});
    this.setState({quest: ["", "", "", "", "", "", "", "", "", "", "", ""]});
    this.setState({correctAnswerPos: 0});
    this.setState({points: 0});
    this.setState({strike: 1});
    this.setState({done: false});
  }

  nextQuestion() {
    document.getElementById("correctAns").style.backgroundColor = "#945bc9";
    if (this.state.questionNumber == 12) {
      this.setState({quizInProgress: false});
      this.setState({resultToShow: true});
      this.setState({done: false});
    }
    else {
      this.setState({questionNumber: this.state.questionNumber + 1});
      this.setState({correctAnswerPos: Math.floor(Math.random() * 4)});
      this.setState({done: false});
    }
  }

  showCorrect() {
    document.getElementById("correctAns").style.setProperty("background-color", "green", "important");
  }

  addPoints() {
    if (!this.state.done){
        this.setState({done: true});
        this.setState({points: this.state.points + (100 * this.state.strike)});
        this.setState({strike: this.state.strike + 1});
        this.showCorrect();
    }
  }

  subtractPoints() {
    if (!this.state.done){
        this.setState({done: true});
        this.setState({strike: 1});
        this.showCorrect();
    }
  }

  generateAnswers(i) {
    if (this.state.quest[this.state.questionNumber - 1].correct_answer == undefined){
      return
    }
    if (i == this.state.correctAnswerPos) {
      return (
        <button id="correctAns" class="button" onClick={() => this.addPoints()} dangerouslySetInnerHTML={{__html:this.state.quest[this.state.questionNumber - 1].correct_answer}}></button>
      )
      this.setState({correctAnswerPos: 4});
    }
    else if (i > this.state.correctAnswerPos) {
      return (
        <button class="button" onClick={() => this.subtractPoints()} dangerouslySetInnerHTML={{__html:this.state.quest[this.state.questionNumber - 1].incorrect_answers[i-1]}}></button>
      )
    }
    else {
      return (
        <button class="button" onClick={() => this.subtractPoints()} dangerouslySetInnerHTML={{__html:this.state.quest[this.state.questionNumber - 1].incorrect_answers[i]}}></button>
      )
    }
  }

  startQuiz(category) {

    if(this.state.mainPage) {
      this.setState({mainPage: false});
      this.setState({quizInProgress: true});
      this.setState({chosenCategory: category});
      this.setState({questionNumber: 1});
      this.setState({correctAnswerPos: Math.floor(Math.random() * 4)});
      switch(category) {
        case "Books":
          axios.get("https://opentdb.com/api.php?amount=12&category=10&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Film":
          axios.get("https://opentdb.com/api.php?amount=12&category=11&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Music":
          axios.get("https://opentdb.com/api.php?amount=12&category=12&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Television":
          axios.get("https://opentdb.com/api.php?amount=12&category=14&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Video Games":
          axios.get("https://opentdb.com/api.php?amount=12&category=15&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Science":
          axios.get("https://opentdb.com/api.php?amount=12&category=17&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Computer Science":
          axios.get("https://opentdb.com/api.php?amount=12&category=18&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Mathematics":
          axios.get("https://opentdb.com/api.php?amount=12&category=19&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Sports":
          axios.get("https://opentdb.com/api.php?amount=12&category=21&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Geography":
          axios.get("https://opentdb.com/api.php?amount=12&category=22&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "History":
          axios.get("https://opentdb.com/api.php?amount=12&category=23&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Politics":
          axios.get("https://opentdb.com/api.php?amount=12&category=24&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Art":
          axios.get("https://opentdb.com/api.php?amount=12&category=25&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Celebrities":
          axios.get("https://opentdb.com/api.php?amount=12&category=26&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        case "Animals":
          axios.get("https://opentdb.com/api.php?amount=12&category=27&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
          break;
        default:
          axios.get("https://opentdb.com/api.php?amount=12&category=9&type=multiple")
          .then(response => {this.setState({quest: response.data.results});});
      }
    }
  }

  render() {
      return (
        <div className={this.state.mainPage ? "centeredDiv" : "content-box"} style={this.state.mainPage ? {"min-height": "100%", width: "100%", padding: "0px 0px"} : {}}>
        {this.state.mainPage
        ? <span><p style={{"font-size": "60px", "font-family": "Lilita One"}}>Let's test your knowledge!</p>
              <table style={{width: "100%", "font-size": "20px", "font-family": "Roboto", "vertical-align": "middle"}}>
              <tr style={{"background-color": "#e697b5", height: "60px", "font-family": "Lilita One", "font-size": "30px"}}>
                <th><p>Category</p></th>
                <th><p>Your best score</p></th>
                <th><p>#1</p></th>
                <th><p>#2</p></th>
                <th><p>#3</p></th>
                <th></th>
              </tr><tr>
                <td><p>General Knowledge</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("General Knowledge")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Books</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Books")}>Start now!</button></td>
              </tr><tr>
                <td><p>Film</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Film")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Music</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Music")}>Start now!</button></td>
              </tr><tr>
                <td><p>Television</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Television")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Video Games</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Video Games")}>Start now!</button></td>
              </tr><tr>
                <td><p>Science</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Science")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Computer Science</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Computer Science")}>Start now!</button></td>
              </tr><tr>
                <td><p>Mathematics</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Mathematics")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Sports</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Sports")}>Start now!</button></td>
              </tr><tr>
                <td><p>Geography</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Geography")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>History</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("History")}>Start now!</button></td>
              </tr><tr>
                <td><p>Politics</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Politics")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Art</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Art")}>Start now!</button></td>
              </tr><tr>
                <td><p>Celebrities</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Celebrities")}>Start now!</button></td>
              </tr><tr style={{"background-color": "#e697b5"}}>
                <td><p>Animals</p></td>
                <td><p>4646</p></td>
                <td><p>24646<br />User1</p></td>
                <td><p>14678<br />User2</p></td>
                <td><p>10564<br />User3</p></td>
                <td><button class="button" style={{marginTop: "1em"}} onClick={() => this.startQuiz("Animals")}>Start now!</button></td>
              </tr></table>
        </span>
      : false}
      {this.state.quizInProgress
      ? <span><p style={{"font-size": "60px", "font-family": "Lilita One", "text-align": "center"}}>{this.state.chosenCategory}{this.state.incorrectAnswers}</p>
      <p style={{"font-size": "40px", "font-family": "Lilita One", "text-align": "center"}}>Question {this.state.questionNumber}</p>
      <p style={{"font-size": "25px", "font-family": "Lilita One", "text-align": "center"}}dangerouslySetInnerHTML={{__html:this.state.quest[this.state.questionNumber - 1].question}}></p>
      {this.generateAnswers(0)}<br />{this.generateAnswers(1)}<br />{this.generateAnswers(2)}<br />{this.generateAnswers(3)}</span> : true}
      {this.state.resultToShow
      ? <span><p style={{"font-size": "40px", "font-family": "Lilita One"}}>{this.state.points == 0 ? "Oh no!" : "Congratulations!"} Your score is {this.state.points}.</p>
      <button class="button" style={{marginTop: "1em"}} onClick={() => this.backToMenu()}>Main Menu</button></span> : true}
      {this.state.done ? <button class="button" style={{marginTop: "2em"}} onClick={() => this.nextQuestion()}>Next Question</button> : true}
      </div>
    )
  }
}

export default Quiz;
