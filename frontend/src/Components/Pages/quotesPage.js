import axios from 'axios'
import {useState} from 'react'
import Quote from '../quote.js';
import "../../Styles/form.css";
import FavButton from "../favButton"
import "../../Styles/jokes.css";


const QuotesPage = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }
    
    function goTo() {
        window.location.href='/inspiroquotes';
    }
    
    return (
        <div class="content-box">
            <Quote/>
            <button onClick = {refreshPage} className="button" style={{marginTop: "1em"}}>Next Quote</button>
            <button onClick={goTo} className="button" style={{marginTop: "1em"}}>Switch to Inspirobot</button>
            <FavButton> </FavButton>
        </div>
    )
}

export default QuotesPage;