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
        <div>
            <form onSubmit={onDeleteAccount} >
                <h1>Delete Account</h1>
                {error && <span> {error} </span>}
                {succes && <span> {succes} </span>}
                <p>Please enter your username</p>
                <br/>
                <label>Username: </label>
                <input
                    type="test"
                    required
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <button type="submit">Send E-mail</button>
            </form>
        </div>
    )
}

export default DeletePasswordPage;