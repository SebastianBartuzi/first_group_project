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
        <div>
            <form onSubmit={onLogin}>
                <h1>Login</h1>
                {error && <span>{error}</span>}
                <label>Username: </label>
                <input type="text" 
                    required
                    placeholder="Input Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label>Password: </label>
                <input type="text" 
                    required
                    placeholder="Input Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;