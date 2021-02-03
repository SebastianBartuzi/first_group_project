import { useState } from "react";
import axios from "axios";

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
        <div>
            <form onSubmit={onRegister}>
                <h1>Register</h1>
                {error && <span>{error}</span>}
                <label>Username: </label>
                <input type="text" 
                    required
                    placeholder="Input Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label>E-mail: </label>
                <input type="text" 
                    required
                    placeholder="Input E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label>Password: </label>
                <input type="text" 
                    required
                    placeholder="Input Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <label>Verify Password: </label>
                <input type="text" 
                    required
                    placeholder="Verify Password" 
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}/>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;