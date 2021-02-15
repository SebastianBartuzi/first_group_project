import { useEffect, useState } from "react";
import axios from "axios";
import MoodKey from "../moodKey";

const MoodTrackerPage = ({history}) =>{
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState("");
    const [data, setData] = useState([]);
    const [color, setColor] = useState("#f6e4cd");
    const [yearDays, setYearDays] = useState( Array.from({ length: 12 }, v => Array.from({ length: 31 }, v => 0)));
    // U will use this to update yearDays: setYearDays(matrix);
    var matrix = Array.from({ length: 12 }, v => Array.from({ length: 31 }, v => 0));

    const moodArray = [ {
        "mood": "Happy",
        "color": "#00FF23",
        "index": 0
    }, {
        "mood": "Sad",
        "color": "#00FF00",
        "index": 1
    },{
        "mood": "Anxious",
        "color": "#FF0000",
        "index": 2
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
        setColor("#FF0000");
    }

    return(
        <div>
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