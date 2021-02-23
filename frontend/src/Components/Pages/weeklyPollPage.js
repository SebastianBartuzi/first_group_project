import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/weeklyPoll.css"

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

    return(
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
            {
                choices.map(element => (
                    <p> option: {element.option}; votes: {element.votes}</p>
                ))
            }
        </div>
    )
}

export default WeeklyPoll;