import { useEffect, useState } from "react";
import axios from 'axios';
import "../../Styles/jokes.css";
import FavButton from "../favButton"

const RiddlePage = () => {
    const [toggleAnswer, setToggleAnswer] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");

    useEffect(() => {
        getRiddle();
    }, [question, answer]);

    const getRiddle = async () => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            axios.post("/api/riddle/getriddle", config)
            .then(res => {
                setQuestion(res.data.question);
                setAnswer(res.data.answer);
            })
            .catch((err) => {
                console.log(err);
            })

        }catch(error){
            console.log(error);
        }
    }
    
    const addRiddle = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const {data} = await axios.post("/api/riddle/addriddle", {newQuestion,newAnswer},config);

        }catch(error){
            console.log(error);
        }
    }


    return (
    <div>
        <FavButton> </FavButton>
         <div>
            <form onSubmit={addRiddle}>
                <h1>Add Riddle</h1>
                <input type="text" 
                    required
                    placeholder="Question" 
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    />
                <br/>
                <input type="text" 
                    required
                    placeholder="Answer" 
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    />
                <br/>
                <button type="submit">Add</button>
            </form>
        </div>
        
        <div className="content-box" style={{padding:"15px", borderRadius:"15px"}}>
        <p className="setup" style={{padding: "15px"}}> {question} </p>
        {
            toggleAnswer && 
            <div>
                <p className = "punchline"> Answer: {answer} </p>
            </div>
        }


        <button class="button" onClick = {() => setToggleAnswer(!toggleAnswer)}>Toggle answer</button>
        
        </div>
    </div>
    );
}

export default RiddlePage;