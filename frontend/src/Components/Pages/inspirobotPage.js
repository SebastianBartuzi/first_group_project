import axios from 'axios'
import {useState} from 'react'
import InspirobotImage from '../inspirobotImage.js';
import "../../Styles/form.css";
import FavButton from "../favButton"

const InspirobotGen = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }

    function goTo() {
        window.location.href='/quotes';
    }

    return (
        <div class="content-box">
            <InspirobotImage/>
            <p style={{textAlign: "center", marginTop: "1em"}}>Credits to <a href='https://inspirobot.me/' target = "_blank" rel = "noopener noreferrer">inspirobot.me</a></p>
            <button onClick = {refreshPage} class="button" style={{marginTop: "1em"}}>Next Wisdom</button>
            <button onClick={goTo} className="button" style={{marginTop: "1em"}}>Switch to Quotes</button>
            <FavButton> </FavButton>
        </div>
    )
}

export default InspirobotGen;