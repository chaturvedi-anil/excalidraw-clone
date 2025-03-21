import { HTTP_URL } from "@/app/config";
import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";

export async function getChats(roomId: number) {
    const response = await axios.get(`${HTTP_URL}/chats/${roomId}`);
    return response.data.messages;
}
export async function ChatRoom({id}:{id:number}) {
    const messages = await getChats(id);
    
    return <ChatRoomClient messages={messages} id={id} />
    
}