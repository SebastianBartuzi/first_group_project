import "../Styles/moodTracker.css"

const MoodKey = ({moodArray}) =>{
    return (
        <div className="key">
        <table>
        {
            moodArray.map((element) => (
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