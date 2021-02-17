import "../Styles/moodTracker.css"

const MoodKey = ({moodArray}) =>{
    var auxMoodArray = moodArray.slice(1);
    return (
        <div className="key">
        <table>
        {
            auxMoodArray.map((element) => (
                <tr>
                    <td>{element.mood}</td>
                    <td style={{color: element.color, textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                </tr>
            ))
        }
        
        </table>
        
    </div>
    )
}

export default MoodKey;