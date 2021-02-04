import axios from "axios";
import { useState } from "react";

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
            return setError("Passwords don't match");
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
        <div>
            <form onSubmit={onResetPassword}>
                <h1>Reset Password</h1>
                {error && <span> {error} </span>}
                {success && <span> {success} </span>}
                <br/>
                <label>Password: </label>
                <input type="password"
                    required
                    placeholder = "Enter password"
                    value = {password}
                    onChange ={(e) => setPassword(e.target.value)}/>
                    <br/>
                <label>Verify Password: </label>
                <input type="password"
                    required
                    placeholder = "Verify password"
                    value = {verifyPassword}
                    onChange ={(e) => setVerifyPassword(e.target.value)}/>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPasswordPage;