import axios from 'axios'
import {useState} from 'react'
import "../../Styles/form.css";

const ChangeMailRequestPage = ({match}) =>{
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onChangeMailRequest = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try{
            const {data} = await axios.post(`/api/authentication/changemailrequest/${match.params.resetToken}`, {email}, config);
            setSuccess("Email sent!");
        }catch(error){
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {setError("");}, 5000);
        }
    };

    return (
        <div class="content-box">
            <form onSubmit={onChangeMailRequest} >
                <h1 class="content-title">Change Email</h1>
                {error && <p class="error-message">{error}</p>}
                {success && <p class="success-message">{success}</p>}
                <br></br>
                <input
                    type="text"
                    required
                    placeholder = "Email:"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    class="text-input"
                />
                <button type="submit" class="button" style={{marginTop: "1em"}}>Send Email</button>
            </form>
        </div>
    )
}

export default ChangeMailRequestPage;