import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import app from '../../firebase';
import Chat from './Chat';
import { getDownloadURL, getStorage, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref, set, push } from "firebase/database";
import { ref as sRef } from 'firebase/storage';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            files: [],
            url: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.message !== '') {
            let dUrl = "";
            if (this.files !== null) {
                const storage = getStorage(app);
                console.log(this.state.files.name)
                const storageRef = sRef(storage, "images/" + this.state.files.name);
                uploadBytes(storageRef, this.state.files)
                const uploadTask = uploadBytesResumable(storageRef, this.state.files);
                uploadTask.on('state_changed',
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },

                    error => {
                        console.log(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            dUrl = downloadURL;

                            this.setState({ url: downloadURL })
                        })
                    })
            }
            console.log(dUrl)
            const db = getDatabase();

            set(push(ref(db, "msg")), {
                // set(push(ref(db, "general/" + new Date().getTime())), {
                message: this.state.message,
                user: this.props.user.displayName,
                img: this.state.url,
                timestamp: new Date().getTime()
            });

        }
        this.setState({ message: '' });
        this.setState({ url: "" })
    }
    handleImg = (e) => {
        let files = e.target.files;
        this.setState({ files: files[0] }, () => { console.log(this.state.files) });
        console.log(files[0]);
        // const image = e.target.files[0]
        // console.log(image.name)
        // this.setState({ image })
        // console.log(this.image.name)
    }
    render() {
        return (
            <div className="home--container">
                <h1>Bem vindo</h1>
                {this.props.user?.displayName}
                {this.props.user &&
                    <div className="allow-chat">
                        <form className="send-chat" onSubmit={this.handleSubmit}>
                            <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Digite sua mensagem' />
                            <input type="file" onChange={e => this.handleImg(e)} accept='image/png' />
                        </form>
                        <Chat></Chat>
                    </div>
                }
                {!this.props.user &&
                    <div className="disallow-chat">
                        <p><Link to="/login">Logar</Link> ou <Link to="/register">Cadastre-se</Link> Para bater um papo!</p>
                    </div>
                }
            </div>
        );
    }
}
export default Home;