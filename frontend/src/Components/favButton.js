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

    const addRemoveFav = async () => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");
            const fav = window.location.pathname.replace("/","")

            const {data} = await axios.post("/api/favs/addRemoveFav", {token, fav},  config)
            getFav()
            
            
        }catch(error){
            console.log(error);
        }
    }

    const getFav = async () => {
        
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");

            const {data} = await axios.post("/api/favs/getAllFavs", {token}, config)
            console.log(data["fav"])
            console.log(window.location.pathname)
            console.log(window.location.pathname.replace("/",""))
            if (data["fav"].includes(window.location.pathname.replace("/",""))){
                setStatus(true)
            }
            else{
                setStatus(false)
            }
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <img src={favStatus ? fullStar: emptyStar} alt="Favorites Star" className="favoriteButton" onClick={addRemoveFav}></img>


        </div>
    )
}

export default FavButton;