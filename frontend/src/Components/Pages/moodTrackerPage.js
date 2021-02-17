import { useEffect, useState } from "react";
import axios from "axios";
import MoodKey from "../moodKey";

import MoodButtons from "../moodButtons";

const MoodTrackerPage = ({history}) =>{    

    const moodArray = [{
        "mood": "No Data",
        "color": "#FFFFFF",
        "index": 0
    }, {
        "mood": "Great Day",
        "color": "#C7CEEA",
        "index": 1
    }, {
        "mood": "Good Day",
        "color": "#B5EAD7",
        "index": 2
    },{
        "mood": "Fine Day",
        "color": "#FFDAC1",
        "index": 3
    },
    {
        "mood": "Kinda Bad Day",
        "color": "#FFB7B2",
        "index": 4
    },
    {
        "mood": "Terrible Day",
        "color": "#FF9AA2",
        "index": 5
    }]


    return(
        <div>
            <MoodButtons moodArray = {moodArray}/>
            <MoodKey moodArray = {moodArray}/>

            
            
        </div>
        // Create a new component, pass moodArray, yearDays as parameter and use map to create buttons         
        
    )
}

export default MoodTrackerPage;