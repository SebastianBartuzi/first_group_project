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
                    var labelstemp = [];//set the labelstemp
                    console.log(res.data.options)
                    res.data.options.forEach(labelloop => {
                        var emojilist={'⛵️':'sailboat','✈️':'airplane','🚀':"rocket",'🚁':'helicopter','🚃':'train','🚎':'tram','🚗':'taxi','🚠':'Mountain Cable','🌽':'maize','🍅':'tomato','🍆':"Eggplant",
                            '🍇':'Grape','🍈':'Melon','🍉':'‎Watermelon','🍊':'tangerine', '🍋':'Lemon','🍌':'Banana','🍍':'pineapple','🍎':'apple','🍏':'green apple','🍐':'pear','🍑':'peach','🍒':'cherry','🍓':'strawberry','🍠':'Roasted Sweet Potato'   }
                        switch (labelloop.option) {
                            case ('⛵️'):
                                var emoji1 = labelloop.option.concat(emojilist['⛵'])
                                labelstemp.push(emoji1);
                                break;
                            case ('✈️'):
                                var emoji2 = labelloop.option.concat(emojilist['✈️'])
                                labelstemp.push(emoji2);
                                break;
                            case ('🚀'):
                                var emoji3 = labelloop.option.concat(emojilist['🚀'])
                                labelstemp.push(emoji3);
                                break;
                            case ('🚁'):
                                var emoji4 = labelloop.option.concat(emojilist['🚁'])
                                labelstemp.push(emoji4);
                                break;
                            case ('🚃'):
                                var emoji5 = labelloop.option.concat(emojilist['🚃'])
                                labelstemp.push(emoji5);
                                break;
                            case ('🚎'):
                                var emoji6 = labelloop.option.concat(emojilist['🚎'])
                                labelstemp.push(emoji6);
                                break;
                            case ('🚗'):
                                var emoji7 = labelloop.option.concat(emojilist['🚗'])
                                labelstemp.push(emoji7);
                                break;
                            case ('🚠'):
                                var emoji8 = labelloop.option.concat(emojilist['🚠'])
                                labelstemp.push(emoji8);
                                break;
                            case('🌽'):
                                var emoji9 = labelloop.option.concat(emojilist['🌽'])
                                labelstemp.push(emoji9);
                                break;
                            case('🍅'):
                                var emoji10 = labelloop.option.concat(emojilist['🍅'])
                                labelstemp.push(emoji10);
                                break;
                            case('🍆'):
                                var emoji11 = labelloop.option.concat(emojilist['🍆'])
                                labelstemp.push(emoji11);
                                break;
                            case('🍇'):
                                var emoji12 = labelloop.option.concat(emojilist['🍇'])
                                labelstemp.push(emoji12);
                                break;
                            case('🍈'):
                                var emoji13 = labelloop.option.concat(emojilist['🍈'])
                                labelstemp.push(emoji13);
                                break;
                            case('🍉'):
                                var emoji14 = labelloop.option.concat(emojilist['🍉'])
                                labelstemp.push(emoji14);
                                break;
                            case('🍊'):
                                var emoji15 = labelloop.option.concat(emojilist['🍊'])
                                labelstemp.push(emoji15);
                                break;
                            case('🍋'):
                                var emoji16 = labelloop.option.concat(emojilist['🍋'])
                                labelstemp.push(emoji16);
                                break;
                            case('🍌'):
                                var emoji17 = labelloop.option.concat(emojilist['🍌'])
                                labelstemp.push(emoji17);
                                break;
                            case('🍍'):
                                var emoji18 = labelloop.option.concat(emojilist['🍍'])
                                labelstemp.push(emoji18);
                                break;
                            case('🍎'):
                                var emoji19 = labelloop.option.concat(emojilist['🍎'])
                                labelstemp.push(emoji19);
                                break;
                            case('🍑'):
                                var emoji26 = labelloop.option.concat(emojilist['🍑'])
                                labelstemp.push(emoji26);
                                break;
                            case('🍏'):
                                var emoji21 = labelloop.option.concat(emojilist['🍏'])
                                labelstemp.push(emoji21);
                                break;
                            case('🍐'):
                                var emoji22 = labelloop.option.concat(emojilist['🍐'])
                                labelstemp.push(emoji22);
                                break;
                            case('🍒'):
                                var emoji23 = labelloop.option.concat(emojilist['🍒'])
                                labelstemp.push(emoji23);
                                break;
                            case('🍓'):
                                var emoji24 = labelloop.option.concat(emojilist['🍓'])
                                labelstemp.push(emoji24);
                                break;
                            case('🍠'):
                                var emoji25 = labelloop.option.concat(emojilist['🍠'])
                                labelstemp.push(emoji25);
                                break;
                            default:
                                console.log("invalid input")
                                break;

                    }

                    });
                    console.log(labelstemp)
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
            {localStorage.getItem("authToken") && <FavButton> </FavButton>}
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
