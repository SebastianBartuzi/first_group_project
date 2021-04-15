import "../../Styles/form.css";
import React from "react";
import {calculateResults} from "../politicalTestCalculator.js";
import "../../Styles/politicalTest.css";
import axios from 'axios';
import FavButton from "../favButton"

class PoliticialTest extends React.Component {
  constructor() {
    super();
    this.state = {
      mainPage: true,
      testStarted: false,
      testFinished: false,
      nofQuestions: 40,
      questions: ["Abortion is healthcare.",
                  "Taxation is theft.",
                  "Religion is the opium of the people.",
                  "The richer you are, the higher taxes you should pay.",
                  "The world should aim to create a world government.",
                  "We should combat tax havens.",
                  "Same sex marriage should be legal.",
                  "Governments should provide houses to homeless people.",
                  "People who follow a different religion to me are wrong.",
                  "Private ownership should be abolished.",
                  "We should emphasize our culture and tradition instead of integrating with other nations.",
                  "Governments should put higher taxes on harmful products such as alcohol or sweets.",
                  "Eating meat should be forbidden.",
                  "Education and healthcare should be private.",
                  "Religion should have as much influence on politics as possible because it provides good moral values.",
                  "It should be a priority for governments to protect the environment.",
                  "Euthanasia should be legal.",
                  "There is nothing wrong with companies who hire children in their Third World factories.",
                  "All monarchy should be abolished.",
                  "Key sectors of the economy should be nationalized.",
                  "The worst criminals should be sentenced to death.",
                  "Poor people are poor only because of their mistakes in the past.",
                  "The truth is always somewhere in between.",
                  "Patents should be abolished.",
                  "Revolution, not evolution.",
                  "COVID-19 vaccines should be distributed equally across the globe.",
                  "Governments should care more about citizens than foreigners living in this country.",
                  "GDP is the best measure of a country’s economic wealth.",
                  "Only people with a higher education should be allowed to vote.",
                  "Being extremely rich is immoral.",
                  "Every opinion should be respected and banning the radical ones is an attack on freedom of speech.",
                  "Employee rights are unnecessary or should be limited.",
                  "Trans rights are human rights.",
                  "All the decisions in your workplace should be taken democratically by all workers.",
                  "Division between right and left is old-fashioned.",
                  "Minimum wage should be abolished and people should be allowed to work for the wage they want.",
                  "People should be allowed to own guns.",
                  "Social programs make people lazy and less willing to find a job.",
                  "Governments should promote the nation's traditional values.",
                  "It should be the government's priority to fight against social inequalities."],
      selectedAnswers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ideologiesResult: null,
    }
  }

  doAgain() {
    this.setState({testStarted: true});
    this.setState({testFinished: false});
    this.setState({selectedAnswers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
    this.setState({ideologiesResult: null});
    window.scrollTo(0, 0);
  }

  setTableRow(number) {
    return (
      <div id={241 + number} class="resultDiv" style={{"background": "repeating-linear-gradient(to right, " + this.state.ideologiesResult[number][2] + ", " + this.state.ideologiesResult[number][2] + " " + this.state.ideologiesResult[number][1] + "%, white " + this.state.ideologiesResult[number][1] + "%, white 100%)"}}>
      <table style={{width: "100%"}}><tr>
      <td style={{width: "3%"}}></td><td style={{"text-align": "left", width: "74%"}}>{this.state.ideologiesResult[number][0]}</td>
      <td style={{"text-align": "right", width: "20%"}}>{this.state.ideologiesResult[number][1]}%</td><td style={{width: "3%"}}></td></tr>
      </table></div>
    );
  }

  showResult() {
    window.scrollTo(0, 0);
    let allAnswered = true;
    for (var i = 0; i < this.state.nofQuestions; i++) {
      if (this.state.selectedAnswers[i] == 0) {
        allAnswered = false;
        let warn = document.getElementById("warning");
        for (var j = 0; j < this.state.nofQuestions; j++) {
          let box = document.getElementById(201 + j);
          if (this.state.selectedAnswers[j] == 0) {
            box.style.border = "4px solid red"
          }
          else {
            box.style.border = "none";
          }
        }
        warn.style.display = "block";
        break;
      }
    }
    if (allAnswered) {
      this.setState({testStarted: false});
      this.setState({testFinished: true});
      let results = calculateResults(this.state.selectedAnswers, this.state.nofQuestions);
      let tempIdeologies = {"Liberalism": results[0],
                            "Socialism": results[1],
                            "Democratic Socialism": results[2],
                            "Social Liberalism": results[3],
                            "Libertarianism": results[4],
                            "Capitalism": results[5],
                            "Fundamentalism": results[6],
                            "Authoritarianism": results[7],
                            "Communism": results[8]};
      let tempColours = {"Liberalism": "#7F6E6E",
                         "Socialism": "#E81717",
                         "Democratic Socialism": "#0F8A06",
                         "Social Liberalism": "#44FF37",
                         "Libertarianism": "#F9F21C",
                         "Capitalism": "#1414E5",
                         "Fundamentalism": "#5B2908",
                         "Authoritarianism": "#590D75",
                         "Communism": "#871212"};
      var ideologies = Object.keys(tempIdeologies).map(function(key) {
        return [key, tempIdeologies[key], tempColours[key]];
      });
      ideologies.sort(function(first, second) {
        return second[1] - first[1];
      });
      console.log(ideologies);
      this.setState({ideologiesResult: ideologies});
    }
  }

  selectButton(i, j) {
    for (var k = 1; k <= 5; k++) {
      let button = document.getElementById(i*5 + k);
      if (button.style.border == "4px solid white") {
        button.style.border = "4px solid black";
        break;
      }
    }
    if (document.getElementById(201 + i).style.border == "4px solid red") {
      document.getElementById(201 + i).style.border = "none";
    }
    let button = document.getElementById(j);
    button.style.border = "4px solid white";
    let list = this.state.selectedAnswers;
    list[i] = j - i*5;
    this.setState({selectedAnswers: list});
  }

  generateQuestions() {
    let content = [];
    for (let i = 0; i < this.state.nofQuestions; i++) {
      content.push(<span><div id={201 + i} class="questionDiv">
      <p style={{"font-size": "30px"}}>{i + 1}. {this.state.questions[i]}</p><br />
      <table style={{width: "95%", display: "block", "margin-left": "auto", "margin-right": "auto", "font-size": "20px"}}><tr>
      <td style={{width: "18%"}}><button id={i*5 + 1} onClick={() => this.selectButton(i, i*5 + 1)} class="answerButton" style={{"background-color": "#B5EAD7"}}>Agree completely.</button></td>
      <td style={{width: "2.5%"}}></td>
      <td style={{width: "18%"}}><button id={i*5 + 2} onClick={() => this.selectButton(i, i*5 + 2)} class="answerButton" style={{"background-color": "#CBB5EB"}}>Agree partially.</button></td>
      <td style={{width: "2.5%"}}></td>
      <td style={{width: "18%"}}><button id={i*5 + 3} onClick={() => this.selectButton(i, i*5 + 3)} class="answerButton" style={{"background-color": "#FFDAC1"}}>No Opinion</button></td>
      <td style={{width: "2.5%"}}></td>
      <td style={{width: "18%"}}><button id={i*5 + 4} onClick={() => this.selectButton(i, i*5 + 4)} class="answerButton" style={{"background-color": "#EFC1BE"}}>Disagree partially.</button></td>
      <td style={{width: "2.5%"}}></td>
      <td style={{width: "18%"}}><button id={i*5 + 5} onClick={() => this.selectButton(i, i*5 + 5)} class="answerButton" style={{"background-color": "#EF818A"}}>Disagree completely.</button></td></tr></table>
      </div><br />
      </span>);
    }
    return content;
  }

  startTest() {
    this.setState({mainPage: false});
    this.setState({testStarted: true});
  }

  render() {
    return (
      <div> {localStorage.getItem("authToken") && <FavButton> </FavButton>}
      <div className="centeredDivP">
        
      {this.state.mainPage
      ? <span> {localStorage.getItem("authToken") && <FavButton> </FavButton>}
        <p style={{"font-size": "60px"}}>Are you curious what's your closest political ideology?</p><br />
      <p style={{"font-size": "30px"}}>Let's solve the following quiz and check it out.</p>
      <p style={{"font-size": "30px"}}>You will see 40 statements and for each of them you will have to choose one of 5 answers.</p><br />
      <button class="button" onClick={() => this.startTest()}>Start now!</button></span>
      
      : false}
      {this.state.testStarted
      ? <span><p style={{"font-size": "60px"}}>Solve the test!</p><br />
      
      <p id="warning" style={{"font-size": "40px", display: "none", color: "red"}}><b>Select all answers!</b><br /></p>
      {this.generateQuestions()}
      <button class="button" onClick={() => this.showResult()}>Count results!</button><br /></span>
      : true}
      {this.state.testFinished
      ? <span><p style={{"font-size": "60px"}}>These are your results!</p><br />
      {this.setTableRow(0)}<br /><br />
      {this.setTableRow(1)}
      {this.setTableRow(2)}
      {this.setTableRow(3)}
      {this.setTableRow(4)}
      {this.setTableRow(5)}
      {this.setTableRow(6)}
      {this.setTableRow(7)}
      {this.setTableRow(8)}<br />
      <button class="button" onClick={() => this.doAgain()}>Do it again!</button><br />
      </span>
      : true}
      </div>
      </div>
    );
  }
}

export default PoliticialTest;
