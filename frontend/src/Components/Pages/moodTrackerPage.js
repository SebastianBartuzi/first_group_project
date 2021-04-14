import { useEffect, useState } from "react";
import axios from "axios";
import MoodKey from "../moodKey";
import FavButton from "../favButton"

import MoodButtons from "../moodButtons";

const MoodTrackerPage = ({history}) =>{    

    const moodArray = [{
        "mood": "No Data",
        "color": "#FFFFFF",
        "index": 0
    }, {
        "mood": "Great Day",
        "color": "#B5EAD7",
        "index": 1
    }, {
        "mood": "Good Day",
        "color": "#CBB5EB",
        "index": 2
    },{
        "mood": "Fine Day",
        "color": "#FFDAC1",
        "index": 3
    },
    {
        "mood": "Kinda Bad Day",
        "color": "#EFC1BE",
        "index": 4
    },
    {
        "mood": "Terrible Day",
        "color": "#EF818A",
        "index": 5
    }]


    return(
        <div>
            {localStorage.getItem("authToken") && <FavButton> </FavButton>}
            <div>
                <h1 className="titlePage">Mood Calendar</h1>
                <p className="text">Our mood calendar is an effective and easy way of keeping track of your mood. It can help you identify patterns and reflect on the past year.  All you need to do is click on the current day to cycle through the different mood options. The mood key on the left-hand side of the page can be used to match a color to your current mood. You can save your selections by clicking on the ‘Save Changes’ button and undo any changes by clicking on the ‘Undo Changes’ button. You can also use the ‘Clear’ button to clear all previous selections. All it takes is a few seconds from your day to start taking note of your mood patterns!</p>
            </div>
            <MoodButtons moodArray = {moodArray}/>
            <MoodKey moodArray = {moodArray}/>

            
            
        </div>
        // Create a new component, pass moodArray, yearDays as parameter and use map to create buttons         
        
    )
}

export default MoodTrackerPage;