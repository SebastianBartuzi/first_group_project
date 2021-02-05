import { useState } from "react";
import axios from "axios";
import "../../Styles/form.css";

const RegisterPage = ({history}) =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    const onRegister = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        if(password != verifyPassword){
            setPassword("");
            setVerifyPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try{
            const {data} = await axios.post("api/authentication/register", {username,email,password},config);

            // localStorage.setItem("authToken", data.token);
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
            <form onSubmit={onRegister}>
                <h1 class="content-title">Register</h1>
                {error && <p class="error-message">{error}</p>}
                <input type="text" 
                    required
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="text-input"/>
                <br/>
                <input type="text" 
                    required
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="text-input" style={{marginTop: "0.5em"}}/>
                <br/>
                <input type="password" 
                    required
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="text-input" style={{marginTop: "0.5em"}}/>
                <br/>
                <input type="password" 
                    required
                    placeholder="Verify Password" 
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    class="text-input" style={{marginTop: "0.5em"}}/>
                <br/>
                <button type="submit"  class="button" style={{marginTop: "1em"}}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;