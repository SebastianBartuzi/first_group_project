import axios from "axios";
import { useState } from "react";
import "../../Styles/form.css";

const ResetPasswordPage = ({match}) =>{
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onResetPassword = async (e) =>{
        e.preventDefault();

        const config = {
        header: {
            "Content-Type": "application/json",
        },
        };

        if (password !== verifyPassword) {
            setPassword("");
            setVerifyPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match!");
        }

        try {
            const { data } = await axios.put(`/api/authentication/resetpassword/${match.params.resetToken}`,{password,},config);

            setSuccess(data.data);
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000)
        }
    }

    return (
        <div class="content-box">
            <form onSubmit={onResetPassword}>
                <h1 class="content-title">Reset Password</h1>
                {error && <p class="error-message">{error}</p>}
                {success && <p class="success-message">{success}</p>}
                <br/>
                <input type="password"
                    required
                    placeholder = "Password"
                    value = {password}
                    onChange ={(e) => setPassword(e.target.value)}
                    class="text-input"/>
                    <br/>
                <input type="password"
                    required
                    placeholder = "Verify Password"
                    value = {verifyPassword}
                    onChange ={(e) => setVerifyPassword(e.target.value)}
                    class="text-input" style={{marginTop: "0.5em"}}/>
                <button type="submit" class="button" style={{marginTop: "1em"}}>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPasswordPage;