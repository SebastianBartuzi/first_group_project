const MoodKey = ({moodArray}) =>{
    return (
        <div style={{position:"absolute", right:"50px", width: "175px", height:"330px", display: "inline-block", backgroundColor:"#fffef2",  border: "thick solid #fadb5d", padding:"1em"}}>

        <table style={{fontFamily:"Roboto", fontSize:"23px", fontStyle: "italic", textAlign:"center"}}>
        
        {
            moodArray.map((element) => (
                <tr>
                    <td>{element.mood}</td>
                    <td style={{color: element.color, textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                </tr>
            ))
        }
        
        </table>
         {/* <table style={{fontFamily:"Roboto", fontSize:"23px", fontStyle: "italic", textAlign:"center"}}>
                    <tr>
                        <td>Happy</td>
                        <td style={{color:"blue", textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                    </tr>
                    <tr>
                        <td>Sad</td>
                        <td style={{color:"yellow", textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                    </tr>
                    <tr>
                        <td>Anxious</td>
                        <td style={{color:"purple", textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                    </tr>
                    <tr>
                        <td>Excited</td>
                        <td style={{color:"pink", textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                    </tr>
                </table> */}

        
    </div>
    )
}

export default MoodKey;