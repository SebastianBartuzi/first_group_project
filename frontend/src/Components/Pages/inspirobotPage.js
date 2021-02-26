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
            <a href='https://inspirobot.me/'>Credit belongs to inspirobot.me</a>
        </div>
    )
}

export default InspirobotGen;