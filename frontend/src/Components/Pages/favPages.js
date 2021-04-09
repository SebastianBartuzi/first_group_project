import axios from "axios";
import { useEffect, useState } from "react";
import "../../Styles/fav.css";
import FavButton from "../favButton"

const FavPage = ({history}) =>{
    const [favList, setFavList] = useState([]);


    const decodeElement = {
        "jokes": "Jokes",
        "moodtracker": "Mood Tracker",
        "weeklypoll": "Weekly Poll",
        "catgenerator": "Cat Generator",
        "favorites": "Favorites",
        "quizzes": "Quizzes",
        "quotes": "Quotes",
        "resources": "Mental Health Resources",
        "riddle": "Riddles"
        }

    useEffect(() => {
        getFavs();
    }, [])

    const getFavs = async () => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");
            const {data} = await axios.post("/api/favs/getAllFavs", {token}, config);
            console.log(data.fav);
            setFavList(data.fav);
        }catch(error){
            console.log(error);
        }
    }

    const removeFavs = async (fav) => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const token = localStorage.getItem("authToken");
            await axios.post("/api/favs/addRemoveFav", {token, fav}, config);
            getFavs();
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <h1 className="titlePage">Favorites</h1>
            <div className="contentBox">
                {
                    favList.map((element) => (
                        <div>
                            <button className="button" 
                            onClick = {() => {history.push(("/"+element)); history.go(0);}}
                            > {element.replace(element, decodeElement[element])} </button>
                            <button className="button" 
                            onClick = {() => removeFavs(element)}
                            > Remove </button>
                            <hr></hr>
                        </div>
                    ))
                }
            </div>    
        </div>
    )
}

export default FavPage;