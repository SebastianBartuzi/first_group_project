const moodButtons = ({moodArray}, {yearDays}) =>{
    return (
        <div>
            {
                console.log("hi")
            }
            
        {
            moodArray.map((element) => (
                //<button onClick={changeColor} style = {{ backgroundColor: color}}>Btn </button>
                <button style = {{ backgroundColor: element.colour }}> Btn {element.index} </button>
                /* <tr>
                    <td>{element.mood}</td>
                    <td style={{color: element.color, textAlign:"center", fontSize:"50px"}}>&#9632;</td>
                </tr> */
            ))
        }
                
    </div>
    )
}

export default moodButtons;