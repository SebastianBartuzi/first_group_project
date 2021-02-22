import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";
import Joke from '../jokeAPI.js';
import "../../Styles/jokes.css";

const JokeGenerator = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }
    
    
    return (
        <div class="content-box">
            <Joke></Joke>
            <button onClick = {refreshPage} class="button" style={{marginTop: "1em", display: "flex", textAlign: "center"}}>Next Joke</button>
        </div>
    )


}

export default JokeGenerator;