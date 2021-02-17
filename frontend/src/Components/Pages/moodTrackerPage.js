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
        "color": "#EF818A",
        "index": 1
    }, {
        "mood": "Good Day",
        "color": "#EFC1BE",
        "index": 2
    },{
        "mood": "Fine Day",
        "color": "#FFDAC1",
        "index": 3
    },
    {
        "mood": "Kinda Bad Day",
        "color": "#CBB5EB",
        "index": 4
    },
    {
        "mood": "Terrible Day",
        "color": "#B5EAD7",
        "index": 5
    }]


    return(
        <div>
            <div>
                <h1 className="title">Mood Calendar</h1>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque arcu erat, viverra sit amet vulputate a, fringilla a sapien. In hac habitasse platea dictumst. Fusce a luctus neque, non tempor sapien. Nam convallis erat ac purus ultrices dapibus. Praesent sodales hendrerit auctor. Suspendisse sit amet finibus dolor, ultricies fermentum libero. Phasellus quis libero in urna interdum lobortis vitae vulputate leo. Sed rhoncus odio erat, eget lacinia nibh condimentum at. Praesent bibendum justo quam, efficitur venenatis mi pellentesque eu. Nullam quis sollicitudin velit. Donec varius facilisis faucibus.</p>
            </div>
            <MoodButtons moodArray = {moodArray}/>
            <MoodKey moodArray = {moodArray}/>

            
            
        </div>
        // Create a new component, pass moodArray, yearDays as parameter and use map to create buttons         
        
    )
}

export default MoodTrackerPage;