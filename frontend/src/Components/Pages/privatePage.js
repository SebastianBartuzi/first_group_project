import axios from "axios";
import { useEffect, useState } from "react";
import "../../Styles/profilePage.css"

const PrivatePage = ({history}) =>{
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const getCredentials = () => {
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        
        try{
            const token = localStorage.getItem("authToken");
            axios.post("/api/credentials/getcredentials", {token}, config)
            .then(res => {
                setEmail(res.data.email);
                setUsername(res.data.username);
            })
            .catch((err) => {
                console.log(err);
            })
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        if(!localStorage.getItem("authToken"))
            history.push("/login");

        getCredentials();
       
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
            <p className="column right">{username}</p>
            </div>
            <button onClick={event =>  window.location.href='/forgotpassword'} className="profile-button">Change Password</button>
        
            <div className = "row profile-text">
            <p className="column left">Email</p>
            <p className="column right">{email}</p>
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