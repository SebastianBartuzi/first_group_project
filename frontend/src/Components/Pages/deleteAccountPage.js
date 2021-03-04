import axios from 'axios'
import {useState} from 'react'


const DeletePasswordPage = () =>{
    const [username, setUsername] = useState("");
    const [succes, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onDeleteAccount = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try{
            const {data} = await axios.post("/api/authentication/delete", {username}, config);
            setSuccess("E-mail sent!");
        }catch(error){
            setError(error.response.data.error);
            setUsername("");
            setTimeout(() => {setError("");}, 5000);
        }
    };

    return (
        <div class="content-box">
            <form onSubmit={onDeleteAccount} >
                <h1 class="content-title">Delete Account</h1>
                {error && <span> {error} </span>}
                {succes && <span> {succes} </span>}
                <br/>
                <span style={{fontSize:"20px", padding:"5px"}}>Username: </span>
                <input
                    type="test"
                    required
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <button type="submit" class="button" style={{marginTop: "1em"}}>Send E-mail</button>
            </form>
        </div>
    )
}

export default DeletePasswordPage;