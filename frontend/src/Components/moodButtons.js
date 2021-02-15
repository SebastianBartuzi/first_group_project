import { useEffect, useState } from "react";
import "../Styles/moodTracker.css"

const MoodButtons = ({moodArray}) =>{
    //console.log(yearDays)
    const [yearDays, setYearDays] = useState( [Array.from({length: 31}, v=>0), Array.from({length: 28}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0) ]);
    // U will use this to update yearDays: setYearDays(matrix);
    //var matrix = Array.from({ length: 12 }, v => Array.from({ length: 31 }, v => 0));
    var matrix = [Array.from({length: 31}, v=>0), Array.from({length: 28}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0), Array.from({length: 30}, v=>0), Array.from({length: 31}, v=>0) ]
    //console.log(matrix);
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

    useEffect(() => {
        // Update the document title using the browser API
        
      }, [yearDays, matrix]);

    const FakeMap = () => {
         return(
            
            yearDays.map((element, index) => (
                //<button onClick={changeColor} style = {{ backgroundColor: color}}>Btn </button>
                //<button style = {{ backgroundColor: element.colour } }> Btn {element.index} </button>
                <div> 
                <label > {months[index]} </label>
                {element.map((mood, counter) => (
                    <span> 
                    
                    <button onClick={() => ChangeDayColour(index, counter)} style={{backgroundColor: moodArray[yearDays[index][counter]]["color"] }}>{counter+1}</button>

                    </span>
                ))}
                </div>

                /* <tr>
                    <td>{element.mood}</td>
                    <td style={{color: element.color, textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                </tr> */
            ))
         )
    }

    const ChangeDayColour = (i, j,) => {
        //console.log(matrix)
        matrix = yearDays
        //console.log(i,j)
        //console.log("Hi")
        
        //console.log(matrix[i][j])
        //console.log(yearDays[i][j])
        matrix[i][j] = (matrix[i][j] + 1) % (moodArray.length)


        setYearDays([...matrix]);
        //matrix = yearDays
    }



    return (

        <div class="box">

        {
            FakeMap()
            
        }
                
    </div>
    )
}

export default MoodButtons;