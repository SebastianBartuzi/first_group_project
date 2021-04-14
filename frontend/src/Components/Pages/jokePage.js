import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";
import Joke from '../jokeAPI.js';
import "../../Styles/jokes.css";
import FavButton from "../favButton"

const JokeGenerator = () =>{
    
    return (
        <div>
        {localStorage.getItem("authToken") && <FavButton> </FavButton>}
        <div class="content-box">
            
            <Joke></Joke>
            
        </div>
        </div>
    )


}

export default JokeGenerator;