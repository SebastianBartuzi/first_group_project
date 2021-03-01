import axios from "axios";
import { useEffect, useState } from "react";
import "../../Styles/profilePage.css"

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
        <div className="profile-box">
            <h1 className="profile-title">Profile</h1>
            {error && {error}}
            <hr/>
            <div className = "row profile-text">
            <p className="column left">Username</p>
            <p className="column right">(Username Here)</p>
            </div>
            <button onClick={event =>  window.location.href='/forgotpassword'} className="profile-button">Change Password</button>
        
            <div className = "row profile-text">
            <p className="column left">Email</p>
            <p className="column right">(Email Here)</p>
            </div>
            <button onClick={event =>  window.location.href='/changemail'} className="profile-button">Change Email</button>
            <br></br>
            <button onClick={event =>  window.location.href='/delete'} class="profile-button">Delete Account</button>
            <br></br>
            <button onClick={onLogout} class="profile-button">Logout</button>
        
        </div>
    )
}

export default PrivatePage;