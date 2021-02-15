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

    const addDate = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");
            const {data} = await axios.post("/api/moodcalendar/addmood", {token, date, mood}, config);
        }catch(error){
            console.log(error);
        }
    }

    const getData = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        
        try{
            const token = localStorage.getItem("authToken");
            axios.post("/api/moodcalendar/getmood", {token}, config)
            .then(res => setData(res.data))
            .catch((err) => {
                console.log(err);
            })
        }catch(error){
            console.log(error);
        }

        // loop through data: data.forEach(() => {}) and change values that exists in the db in matrix
        // setYearDays(matrix);
    }

    const changeColor = () =>{
        //console.log(matrix)
        //console.log("hello");
        setColor("#FF0000");
        //console.log(matrix[0][0]);
        //console.log("Hi");
    }

    return(
        <div>
            <div>
                <p> Mood buttons </p>
            <MoodButtons moodArray = {moodArray}/>
            </div>

            <button onClick={changeColor} style = {{ backgroundColor: color}}>Btn</button>
            
            <br/><br/>
            <form onSubmit={addDate}>
                <h1>Add Mood</h1>
                <br/>
                <input
                    type="date"
                    required
                    value = {date}
                    onChange = {(e) => setDate(e.target.value)}
                    />
                    <br/>
                    <input
                    type="text"
                    required
                    placeholder = "Mood number"
                    value = {mood}
                    onChange = {(e) => setMood(e.target.value)}
                    />
                    <button type="submit">Set mood</button>
                <br/>
                <h1>Get data</h1>
                <br/>
                
                <button onClick={getData} type="submit">Get data</button>

                {
                    data.map((element,index) => (
                    <div>
                    <p> Mood Track {index} </p>
                    <p> Date: {element.date} </p>
                    <p> Mood: {element.mood} </p>
                    <br/>
                    </div>))
                }


            </form>

            <MoodKey moodArray = {moodArray}/>

            
            
        </div>
        // Create a new component, pass moodArray, yearDays as parameter and use map to create buttons         
        
    )
}

export default MoodTrackerPage;