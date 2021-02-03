import axios from "axios";
import { useEffect, useState } from "react";

const PrivatePage = ({history}) =>{
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() =>{
        if(!localStorage.getItem("authToken"))
            history.push("/login");

        const fetchPrivateData = async () => {
        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localStorage.getItem("authToken")}`
            }
        }
        
    try{
        const {data} = await axios.get("/api/private", config);
        setPrivateData(data.data);
    }catch(error){
        localStorage.removeItem("authToken");
        setError("Invalid Token");
    }
    }
    
    fetchPrivateData();
    }, [])

    const onLogout = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
        history.go(0);
    }


    return(
        <div>
            <h1>Private</h1>
            {error && {error}}
            <button onClick={onLogout}>Logout</button>
        
        </div>
    )
}

export default PrivatePage;