import { useEffect, useState } from "react";
import axios from "axios";

const MoodTrackerPage = ({history}) =>{
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState("");
    const [data, setData] = useState([]);

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
    }

    return(
        <div>
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

        </div>
    )
}

export default MoodTrackerPage;