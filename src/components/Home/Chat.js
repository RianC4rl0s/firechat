import React from 'react';
// eslint-disable-next-line no-unused-vars
import app from "../../firebase"

import "./Home.css"
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            userId: ""
        }
    }

    componentDidMount() {

        const db = getDatabase();
        const chatRef = ref(db, 'msg/');
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            let ascChats = [];
            for (let chat in data) {
                ascChats.push({
                    id: chat,
                    userId: data[chat].userId,
                    message: data[chat].message,
                    user: data[chat].user,
                    date: data[chat].timestamp,
                    img: data[chat].img
                });
            }
            const chats = ascChats.reverse();
            this.setState({ chats });
        });


    }
    handleUid(value) {
        const auth = getAuth();
        const user = auth.currentUser

        if (user.uid === value.userId) {
            return "my-msg"
        } else {
            return "others"
        }
    }
    render() {
        return (
            <div className="chatbox">
                {/* {console.log(this.chats)} */}
                <ul className='msgList'>
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return (

                            <li key={chat.id}>
                                <div className={`${this.handleUid(chat)}`}>

                                    <label className='userLabel'>{chat.user}</label><br />
                                    {/* {user.uid === chat.userid ? <>Teste</> : chat.message}<br /> */}
                                    {/* {this.handleUid(chat)} */}

                                    {chat.message}

                                    {chat.img !== null ?
                                        <img height="100px" src={chat.img} alt={chat.img} />
                                        :
                                        <></>
                                    }
                                    {/* {chat.userId} */}
                                    <label className='dataLabel'>
                                        {postDate.getDate() + '/' + (postDate.getMonth() + 1) + " "}
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Chat;