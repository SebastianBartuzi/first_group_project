import "../../Styles/form.css";
import "../../Styles/quiz.css";
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
          myScore: {
            "Books": 0,
            "Film": 0,
            "Music": 0,
            "Television": 0,
            "Video Games": 0,
            "Science": 0,
            "Computer Science": 0,
            "Mathematics": 0,
            "Sports": 0,
            "Geography": 0,
            "History": 0,
            "Politics": 0,
            "Art": 0,
            "Celebrities": 0,
            "Animals": 0,
            "General Knowledge": 0
          },
          bestScore: {
            "Books": [0,0,0],
            "Film": [0,0,0],
            "Music": [0,0,0],
            "Television": [0,0,0],
            "Video Games": [0,0,0],
            "Science": [0,0,0],
            "Computer Science": [0,0,0],
            "Mathematics": [0,0,0],
            "Sports": [0,0,0],
            "Geography": [0,0,0],
            "History": [0,0,0],
            "Politics": [0,0,0],
            "Art": [0,0,0],
            "Celebrities": [0,0,0],
            "Animals": [0,0,0],
            "General Knowledge": [0,0,0]
          },
          
        totalScore: []
      }
  }
  componentDidMount(){
    this.getMyScore()
    this.getTotalScores()
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
    this.getMyScore();
    this.getTotalScores();
  }

  

  nextQuestion() {
    document.getElementById("correctAns").style.backgroundColor = "#945bc9";
    if (this.state.questionNumber == 12) {
      this.setState({quizInProgress: false});
      this.setState({resultToShow: true});
      this.setState({done: false});
      this.sendData();
    }
    else {
      this.setState({questionNumber: this.state.questionNumber + 1});
      this.setState({correctAnswerPos: Math.floor(Math.random() * 4)});
      this.setState({done: false});
    }
  }

  async sendData() {
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }

    try{
        const token = localStorage.getItem("authToken");
        const score = this.state.points;
        const category = this.state.chosenCategory;
        await axios.post("/api/leaderboards/updateleaderboards", {token, score, category}, config);
    }catch(error){
        console.log(error);
    }
}

async getMyScore() {
  const config = {
      header: {
          "Content-type": "application/json"
      }
  }

  try{
    const token = localStorage.getItem("authToken");
      await axios.post("/api/leaderboards/getleaderboards", {token}, config)
      .then(response => this.setState({myScore: response.data}))
      .catch(error => console.log(error));

  }catch(error){
      console.log(error);
  }
}

async getTotalScores(){
  const config = {
    header: {
        "Content-type": "application/json"
    }
  }

  try{
      await axios.post("/api/leaderboards/getallscores", {}, config)
      .then(response => this.setState({totalScore: response.data}))
      
      .catch(error => console.log(error));
      //console.log(this.state.totalScore)
      //console.log(Object.values(this.state.totalScore)[0])
      var list1 = Object.values(this.state.totalScore)[0]
      var bestScoreTemp = {
        "Books": [0,0,0],
        "Film": [0,0,0],
        "Music": [0,0,0],
        "Television": [0,0,0],
        "Video Games": [0,0,0],
        "Science": [0,0,0],
        "Computer Science": [0,0,0],
        "Mathematics": [0,0,0],
        "Sports": [0,0,0],
        "Geography": [0,0,0],
        "History": [0,0,0],
        "Politics": [0,0,0],
        "Art": [0,0,0],
        "Celebrities": [0,0,0],
        "Animals": [0,0,0],
        "General Knowledge": [0,0,0]
      }
      //console.log(this.state.bestScore)
      list1.forEach(element => {
        //console.log(element)
        //console.log(this.state.bestScore)
        Object.keys(element).forEach(function(key) {
          if(element[key]>bestScoreTemp[key][0]) {
            bestScoreTemp[key][2] = bestScoreTemp[key][1]
            bestScoreTemp[key][1] = bestScoreTemp[key][0]
            bestScoreTemp[key][0] = element[key];
            } else if(element[key]>bestScoreTemp[key][1]){
              bestScoreTemp[key][2] = bestScoreTemp[key][1]
              bestScoreTemp[key][1] = element[key];
            } else if(element[key]>bestScoreTemp[key][2]){
              bestScoreTemp[key][2] = element[key];
            }


          });

      });
      //console.log(this.state.bestScore)
      this.state.bestScore = bestScoreTemp;
      //console.log(this.state.bestScore)




  }catch(error){
      console.log(error);
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
        <div className={this.state.mainPage ? "mainPage" : "content-box"}>
        {this.state.mainPage
        ? <span><p className="titlePage">Let's test your knowledge!</p>
        <div >
              <table className="quizBox">
                <tr className="rowTitle">
                  <th><p>Category</p></th>
                  <th><p>Your best score</p></th>
                  <th><p>#1</p></th>
                  <th><p>#2</p></th>
                  <th><p>#3</p></th>
                  <th></th>
                </tr>
                <tr className="altRow">
                  <td><p>General Knowledge</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["General Knowledge"]}</p></td>
                  <td><p>{this.state.bestScore["General Knowledge"][0]}</p></td>
                  <td><p>{this.state.bestScore["General Knowledge"][1]}</p></td>
                  <td><p>{this.state.bestScore["General Knowledge"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("General Knowledge")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Books</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Books"]}</p></td>
                  <td><p>{this.state.bestScore["Books"][0]}</p></td>
                  <td><p>{this.state.bestScore["Books"][1]}</p></td>
                  <td><p>{this.state.bestScore["Books"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Books")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Film</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Film"]}</p></td>
                  <td><p>{this.state.bestScore["Film"][0]}</p></td>
                  <td><p>{this.state.bestScore["Film"][1]}</p></td>
                  <td><p>{this.state.bestScore["Film"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Film")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Music</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Music"]}</p></td>
                  <td><p>{this.state.bestScore["Music"][0]}</p></td>
                  <td><p>{this.state.bestScore["Music"][1]}</p></td>
                  <td><p>{this.state.bestScore["Music"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Music")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Television</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Television"]}</p></td>
                  <td><p>{this.state.bestScore["Television"][0]}</p></td>
                  <td><p>{this.state.bestScore["Television"][1]}</p></td>
                  <td><p>{this.state.bestScore["Television"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Television")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Video Games</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Video Games"]}</p></td>
                  <td><p>{this.state.bestScore["Video Games"][0]}</p></td>
                  <td><p>{this.state.bestScore["Video Games"][1]}</p></td>
                  <td><p>{this.state.bestScore["Video Games"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Video Games")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Science</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Science"]}</p></td>
                  <td><p>{this.state.bestScore["Science"][0]}</p></td>
                  <td><p>{this.state.bestScore["Science"][1]}</p></td>
                  <td><p>{this.state.bestScore["Science"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Science")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Computer Science</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Computer Science"]}</p></td>
                  <td><p>{this.state.bestScore["Computer Science"][0]}</p></td>
                  <td><p>{this.state.bestScore["Computer Science"][1]}</p></td>
                  <td><p>{this.state.bestScore["Computer Science"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Computer Science")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Mathematics</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Mathematics"]}</p></td>
                  <td><p>{this.state.bestScore["Mathematics"][0]}</p></td>
                  <td><p>{this.state.bestScore["Mathematics"][1]}</p></td>
                  <td><p>{this.state.bestScore["Mathematics"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Mathematics")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Sports</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Sports"]}</p></td>
                  <td><p>{this.state.bestScore["Sports"][0]}</p></td>
                  <td><p>{this.state.bestScore["Sports"][1]}</p></td>
                  <td><p>{this.state.bestScore["Sports"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Sports")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Geography</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Geography"]}</p></td>
                  <td><p>{this.state.bestScore["Geography"][0]}</p></td>
                  <td><p>{this.state.bestScore["Geography"][1]}</p></td>
                  <td><p>{this.state.bestScore["Geography"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Geography")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>History</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["History"]}</p></td>
                  <td><p>{this.state.bestScore["History"][0]}</p></td>
                  <td><p>{this.state.bestScore["History"][1]}</p></td>
                  <td><p>{this.state.bestScore["History"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("History")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Politics</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Politics"]}</p></td>
                  <td><p>{this.state.bestScore["Politics"][0]}</p></td>
                  <td><p>{this.state.bestScore["Politics"][1]}</p></td>
                  <td><p>{this.state.bestScore["Politics"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Politics")}>Start now!</button></td>
                </tr>
                
                <tr>
                  <td><p>Art</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Art"]}</p></td>
                  <td><p>{this.state.bestScore["Art"][0]}</p></td>
                  <td><p>{this.state.bestScore["Art"][1]}</p></td>
                  <td><p>{this.state.bestScore["Art"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Art")}>Start now!</button></td>
                </tr>
                
                <tr className="altRow">
                  <td><p>Celebrities</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Celebrities"]}</p></td>
                  <td><p>{this.state.bestScore["Celebrities"][0]}</p></td>
                  <td><p>{this.state.bestScore["Celebrities"][1]}</p></td>
                  <td><p>{this.state.bestScore["Celebrities"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Celebrities")}>Start now!</button></td>
                </tr>
                
                
                <tr>
                  <td><p>Animals</p></td>
                  <td><p>{Object.values(this.state.myScore)[0]["Animals"]}</p></td>
                  <td><p>{this.state.bestScore["Animals"][0]}</p></td>
                  <td><p>{this.state.bestScore["Animals"][1]}</p></td>
                  <td><p>{this.state.bestScore["Animals"][2]}</p></td>
                  <td><button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.startQuiz("Animals")}>Start now!</button></td>
                </tr>
                
              </table>
              </div>
        </span>
      : false}
      {this.state.quizInProgress
      ? <span><p style={{"font-size": "60px", "font-family": "Lilita One", "text-align": "center"}}>{this.state.chosenCategory}{this.state.incorrectAnswers}</p>
      <p style={{"font-size": "40px", "font-family": "Lilita One", "text-align": "center"}}>Question {this.state.questionNumber}</p>
      <p style={{"font-size": "25px", "font-family": "Lilita One", "text-align": "center"}}dangerouslySetInnerHTML={{__html:this.state.quest[this.state.questionNumber - 1].question}}></p>
      {this.generateAnswers(0)}<br />{this.generateAnswers(1)}<br />{this.generateAnswers(2)}<br />{this.generateAnswers(3)}</span> : true}
      {this.state.resultToShow
      ? <span><p style={{"font-size": "40px", "font-family": "Lilita One"}}>{this.state.points == 0 ? "Oh no!" : "Congratulations!"} Your score is {this.state.points}.</p>
      
      <button class="button" style={{marginTop: "0.5em", marginBottom:"0.5em"}} onClick={() => this.backToMenu()}>Main Menu</button></span> : true}
      {this.state.done ? <button class="button" style={{marginTop: "2em"}} onClick={() => this.nextQuestion()}>Next Question</button> : true}
      </div>
    )
  }
}

export default Quiz;
