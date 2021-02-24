import { useEffect, useState } from "react";
import "../Styles/moodTracker.css"
import axios from "axios"

const MoodButtons = ({moodArray}) =>{

     const [yearDays, setYearDays] = useState( [Array.from({length: 31}, v=>0), Array.from({length: 28}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0) ]);
     var matrix = [Array.from({length: 31}, v=>0), Array.from({length: 28}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0) ]
     var months = ["January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December"]

    const addData = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");
            const data = yearDays;
            await axios.post("/api/moodcalendar/addmood", {token, data}, config);
        }catch(error){
            console.log(error);
        }
    }

    const getData = async (e) => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        
        try{
            const token = localStorage.getItem("authToken");
            axios.post("/api/moodcalendar/getmood", {token}, config)
            .then(res => setYearDays([...res.data]))
            .catch((err) => {
                console.log(err);
            })
            console.log(yearDays)
        }catch(error){
            console.log(error);
        }

    }

    const clearData = () =>{
        matrix = matrix.filter( month => month.filter(day => day = 0));
        setYearDays([...matrix]);
    }

    const undoChanges = () => {
        getData();
    }

    useEffect(() => {
        getData()
      }, []);

    const FakeMap = () => {
         return(
            
            yearDays.map((element, index) => (
                <div className="row"> 
                <label className="column left"> {months[index]} </label>
                <div className="column right">
                {element.map((mood, counter) => (
                    <span> 
                        <button className="moodButton" onClick={() => ChangeDayColour(index, counter)} style={{backgroundColor: moodArray[yearDays[index][counter]]["color"] }}>{counter+1}</button>
                    </span>
                ))}
                <hr/>
                </div>
                </div>
            ))
         )
    }

    const ChangeDayColour = (i, j,) => {
        matrix = yearDays
        matrix[i][j] = (matrix[i][j] + 1) % (moodArray.length)
        setYearDays([...matrix]);
    }



    return (
        <div class="box">
            <button className="moodButton2" onClick={addData}>Save</button>
            <button className="moodButton2" onClick={clearData}>Clear</button>
            <button className="moodButton2" onClick={undoChanges}>Undo Changes</button>

        {FakeMap()}
                
    </div>
    )
}

export default MoodButtons;