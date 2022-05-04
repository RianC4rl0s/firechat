import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
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
                <h1>Bem vindo</h1>
                {this.props.user?.displayName}
                {this.props.user &&
                    <div className="allow-chat">
                        <form className="send-chat" onSubmit={this.handleSubmit}>
                            <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Digite sua mensagem' />
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