import { useEffect, useState } from "react";
import axios from "axios";

const LoginPage = ({history}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() =>{
        if(localStorage.getItem("authToken"))
            history.push("/");
    },[history]);

    const onLogin = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        try{
            const {data} = await axios.post("/api/authentication/login", {username,password},config);

            localStorage.setItem("authToken", data.token);
            history.push("/");
            history.go(0);
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return(
        <div class="content-box">
            <form onSubmit={onLogin}>
                <h1 class="content-title">Login</h1>
                {error && <p class="error-message">{error}</p>}
                <input type="text" 
                    required
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="text-input"/>
                <br/>
                <input type="password" 
                    required
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="text-input"
                    style={{marginTop: "0.5em"}}/>
                <br/>
                <button type="submit" class="button" style={{marginTop: "1em"}}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;