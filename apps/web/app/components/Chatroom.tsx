import axios from 'axios'
import React from 'react'
import { BACKEND_URL } from '../config';

const getChats = await (roomId) => {
    const reponse = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return reponse.data.messages;
}
const Chatroom = ({roomId}: {id:string}) => {
    const messages = await getChats(roomId);
    return (
        <div>Chatroom</div>
    )
}

export default Chatroom