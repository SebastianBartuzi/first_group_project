import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";

const ForgotPasswordPage = () =>{
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onForgotPassword = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try{
            const {data} = await axios.post("api/authentication/forgotpassword", {username}, config);
            setSuccess("Email sent!");
        }catch(error){
            setError(error.response.data.error);
            setUsername("");
            setTimeout(() => {setError("");}, 5000);
        }
    };

    return (
        <div class="content-box">
            <form onSubmit={onForgotPassword} >
                <h1 class="content-title">Forgot Password</h1>
                {error && <p class="error-message">{error}</p>}
                {success && <p class="success-message">{success}</p>}
                <span style={{fontSize:"20px", padding:"5px"}}>Username: </span>
                <input
                    type="text"
                    required
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    class="text-input"
                />
                <button type="submit" class="button" style={{marginTop: "1em"}}>Send Email</button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;