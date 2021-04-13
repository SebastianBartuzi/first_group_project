import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/weeklyPoll.css";
import {Pie} from 'react-chartjs-2';
import FavButton from "../favButton"

const WeeklyPoll = () => {
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([]);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    useEffect(() =>{
        onPoolRequest();
    },[]);

    const onPoolRequest = async () => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try{
            axios.post("/api/polls/getpoll", config)
            .then(res => {
                setQuestion(res.data.question);
                setChoices(res.data.options);
                var labelstemp = [];
                res.data.options.forEach(labelloop => {labelstemp.push(labelloop.option)});
                setLabelOptions(labelstemp);
                var datatemp = [];
                res.data.options.forEach(dataloop => {datatemp.push(dataloop.votes)});
                setDataVotes(datatemp);
            })
            .catch((err) => {
                console.log(err);
            })
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {setError("");}, 5000);
        }
    };

    const onVote = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        if(!answer){
            setError("Option not selected");
            return setError("Option not selected");
        }

        try{
            const token = localStorage.getItem("authToken");
            const {data} = await axios.post("api/polls/updatepoll", {token, answer},config);

        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

        onPoolRequest();
    }

    const [labels_options, setLabelOptions] = useState([]);
    const [data_votes, setDataVotes] = useState([]);
    const [toggleChart, setToggleChart] = useState(false);

    const state = {
        labels: labels_options,
        
        datasets: [
          {
            backgroundColor: [
              '#560133',
              '#450270',
              '#9F0162',
              '#8400CD',
              '#EF0096',
              '#FF92FD',
              '#FFCCFE',
              '#FFCFE2',
              '#FF9DC8',
              '#C7007C',
              '#A40122',
              '#F60239',
              '#FF6E3A',
              '#FFAC3B',
              '#FFDC3D',
              '#7E0018',
              '#790149'
            ],
            data: data_votes,
          }
        ]
      }


    return(
        <div>
            <FavButton> </FavButton>
        <div className = "poll-box">
            {error}
            <form onSubmit = {onVote}>
            <p className="poll-title">{question}</p>
            {
                choices.map(element => (
                    <div className="poll-inline">
                        <input className="poll-radio"
                            type = "radio"
                            name = {element.option}
                            value = {element.option}
                            checked = {answer == element.option}
                            onClick = {() => setAnswer(element.option)}
                            />
                        <label className="poll-text"> {element.option} </label>
                        <br/>
                    </div>
                    ))
            }
            <br></br><button type = "submit" className="poll-button"> Vote </button>
            </form>
            <button onClick = {() => setToggleChart(!toggleChart)} className="poll-button">Toggle Results</button>
            { toggleChart &&
                <Pie className="pie-chart"
                    data={state}
                    options={{
                        legend:{
                        display:false,
                        position:'right'
                        }
                    }}
                    />
                }
            {/* {
                choices.map(element => (
                    <p> option: {element.option}; votes: {element.votes}</p>
                ))
            } */}
            </div>
        </div>
    )
}

export default WeeklyPoll;