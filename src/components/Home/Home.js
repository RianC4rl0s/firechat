import React from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase';
import Chat from './Chat';

import { getDatabase, ref, set,push } from "firebase/database";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.message !== '') {
            const db = getDatabase();
            
            set(push(ref(db, "general")), {
            // set(push(ref(db, "general/" + new Date().getTime())), {
                message: this.state.message,
                user: this.props.user.displayName,
                timestamp: new Date().getTime()
            });
            //   const chatRef = app.database().ref('test');
            //   const chat = {
            //     message: this.state.message,
            //     user: this.props.user.displayName,
            //     timestamp: new Date().getTime()
            //   }

            //   chatRef.push(chat);
            //   this.setState({message: ''});
        }
        this.setState({ message: '' });
    }
    render() {
        return (
            <div className="home--container">
                <h1>Welcome to the chat!</h1>
                {this.props.user &&
                    <div className="allow-chat">
                        <form className="send-chat" onSubmit={this.handleSubmit}>
                            <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Leave a message...' />
                        </form>
                        <Chat></Chat>
                    </div>
                }
                {!this.props.user &&
                    <div className="disallow-chat">
                        <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
                    </div>
                }
            </div>
        );
    }
}
export default Home;