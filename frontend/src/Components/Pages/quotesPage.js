import axios from 'axios'
import {useState} from 'react'
import Quote from '../quote.js';
import "../../Styles/form.css";

const QuotesPage = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }
    
    
    return (
        <div class="content-box">
            <Quote/>
            <button onClick = {refreshPage} className="button" style={{marginTop: "1em"}}>Next Quote</button>
        </div>
    )
}

export default QuotesPage;