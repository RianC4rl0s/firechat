import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
import app from '../../firebase.js'
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router";
import "../Auth/Auth.css"
const Account = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [erro, setError] = useState("")
    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "") {

            const auth = getAuth();
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                setName("")
                navigate(-1)
            }).catch((error) => {
                setError(error)
            });
        }
    }
    function handleDelete(e) {
        e.preventDefault()
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user).then(() => {
            // User deleted.
            getAuth().signOut()
                .then(window.location = "/");
        }).catch((error) => {
            // An error ocurred
            // ...
        });

        // TODO(you): prompt the user to re-provide their sign-in credentials

    }
    return (
        <>
            <div className="auth--container">

                <form onSubmit={handleSubmit}>

                    <label className="container1" htmlFor="username">Novo nome</label>
                    <input type="text" name="username" id="username" onChange={(e) => setName(e.target.value)} />
                    {name}
                    <br />
                </form>
                <button 
                className="bnt-success"
                onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                }}>Voltar</button>
                {erro}
                <button className="bnt-danger" onClick={handleDelete}>Deletar conta</button>
            </div>
        </>
    )
}
export default Account;