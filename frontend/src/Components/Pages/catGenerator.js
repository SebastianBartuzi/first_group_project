import axios from 'axios'
import {useState} from 'react'
import CatImage from '../catImage.js';
import "../../Styles/form.css";
import FavButton from "../favButton"

const CatGenerator = () =>{

    function refreshPage() {
        window.location.reload(false); 
    }
    
    
    return (
        <div class="content-box">
            <CatImage/>
            <button onClick = {refreshPage} class="button" style={{marginTop: "1em"}}>Next Cat</button>
            <FavButton> </FavButton>

        </div>
    )
}

export default CatGenerator;