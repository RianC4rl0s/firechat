import React from 'react';
// eslint-disable-next-line no-unused-vars
import app from "../../firebase"
import { getDatabase, ref, onValue } from "firebase/database";
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
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
    render() {
        return (
            <div className="chatbox">
                {/* {console.log(this.chats)} */}
                <ul className='chat-list'>
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return (
                            <li key={chat.id}>
                                <em>{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
                                <strong>{chat.user}:</strong>
                                {chat.message}
                                {chat.img === "" ?
                                    <img src={chat.img} alt={chat.img} />
                                :
                                <></>
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Chat;