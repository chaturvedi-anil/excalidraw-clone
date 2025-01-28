import axios from 'axios'
import { BACKEND_URL } from '../config';
import { ChatRoomClient } from './ChatRoomClient';

const getChats = async(id:number) => {
    const reponse = await axios.get(`${BACKEND_URL}/chats/${id}`);
    
    return reponse.data.messages;
}
const ChatRoom = async ({id}: {id:number}) => {
    const messages = await getChats(id);
    return <ChatRoomClient messages={messages} id={id} />
}

export default ChatRoom