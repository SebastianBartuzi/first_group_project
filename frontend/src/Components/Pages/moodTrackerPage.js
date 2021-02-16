import { useEffect, useState } from "react";
import axios from "axios";
import MoodKey from "../moodKey";

import MoodButtons from "../moodButtons";

const MoodTrackerPage = ({history}) =>{
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState("");
    const [data, setData] = useState([]);
    const [color, setColor] = useState("#f6e4cd");
    

    const moodArray = [{
        "mood": "Neutral",
        "color": "#FFFFFF",
        "index": 0
    }, {
        "mood": "Happy",
        "color": "#00FF23",
        "index": 1
    }, {
        "mood": "Sad",
        "color": "#007000",
        "index": 2
    },{
        "mood": "Anxious",
        "color": "#FF0000",
        "index": 3
    }]

    const changeColor = () =>{
        //console.log(matrix)
        //console.log("hello");
        setColor("#FF0000");
        //console.log(matrix[0][0]);
        //console.log("Hi");
    }

    return(
        <div>
            <MoodButtons moodArray = {moodArray}/>
            <MoodKey moodArray = {moodArray}/>

            
            
        </div>
        // Create a new component, pass moodArray, yearDays as parameter and use map to create buttons         
        
    )
}

export default MoodTrackerPage;