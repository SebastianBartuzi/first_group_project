import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";
import Joke from '../jokeAPI.js';
import "../../Styles/jokes.css";
import FavButton from "../favButton"

const JokeGenerator = () =>{
    
    return (
        <div class="content-box">
            
            <Joke></Joke>
            <FavButton> </FavButton>
        </div>
    )


}

export default JokeGenerator;