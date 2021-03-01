import axios from 'axios'
import {useState} from 'react'
import InspirobotImage from '../inspirobotImage.js';
import "../../Styles/form.css";

const InspirobotGen = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }
    
    
    return (
        <div class="content-box">
            <InspirobotImage/>
            <button onClick = {refreshPage} class="button" style={{marginTop: "1em"}}>Next Wisdom</button>
            <p style={{textAlign: "center", marginTop: "1em"}}>Credits to <a href='https://inspirobot.me/'>inspirobot.me</a></p>
        </div>
    )
}

export default InspirobotGen;