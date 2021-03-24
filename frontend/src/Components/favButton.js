import { useEffect, useState } from "react";
import "../Styles/fav.css"
import axios from "axios"
import emptyStar from "../images/EmpStar.png" 
import fullStar from "../images/FillStar.png" 

const FavButton = () =>{
    
    const [favStatus, setStatus] = useState(false);

    useEffect(() => {
        getFav()
    }, [])

    const getFav = async () => {
        
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");

            const {data} = await axios.post("/api/favs/getAllFavs", {token}, config)
            console.log(data)
            
        }catch(error){
            console.log(error);
        }
    }
//<img src={favStatus ? fullStar: emptyStar} alt="Favorites Star"></img>
    return (
        <div>

            <h1> HELLO </h1>


        </div>
    )
}

export default FavButton;