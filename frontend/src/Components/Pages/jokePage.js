import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";
import Joke from '../jokeAPI.js';
import "../../Styles/jokes.css";

const JokeGenerator = () =>{
    
    return (
        <div class="content-box">
            <Joke></Joke>
        </div>
    )


}

export default JokeGenerator;