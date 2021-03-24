import axios from "axios";
import { useEffect, useState } from "react";
import "../../Styles/fav.css";
import FavButton from "../favButton"

const FavPage = ({history}) =>{
    const [favList, setFavList] = useState([]);
    const decode = {
        "jokes": "/jokes",
        "moodtracker": "/moodtracker",
        "weeklypoll": "/weeklypoll",
        "catgenerator": "/catgenerator",
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
            <div className="contentBox">
                {
                    favList.map((element) => (
                        <span>
                            <button className="button" 
                            onClick = {() => {history.push(decode[element]); history.go(0);}}
                            > {element} </button>
                            <button className="button" 
                            onClick = {() => removeFavs(element)}
                            > Remove </button>
                        </span>
                    ))
                }
                <FavButton> </FavButton>
            </div>    
        </div>
    )
}

export default FavPage;