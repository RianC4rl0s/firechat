import React, { useState } from "react";

import app from '../../firebase.js'
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router";

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
            <form onSubmit={handleSubmit}>

                <label class = "container1" htmlFor="username">Novo nome</label>
                <input type="text" name="username" id="username" onChange={(e) => setName(e.target.value)} />
                {name}
                <br />
            </form>
            <button onClick={(e) => {
                e.preventDefault()
                navigate(-1)
            }}>Voltar</button>
            {erro}
            <button style={{ backgroundColor: "red", color: "white", borderRadius: "5px" }} onClick={handleDelete}>Deletar conta</button>
        </>
    )
}
export default Account;