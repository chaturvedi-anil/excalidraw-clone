import axios from "axios";
import { HTTP_URL } from "@/app/config";
import { ChatRoom } from "@/components/ChatRoom";

async function getRoomId(slug:string) {
    const response = await axios.get(`${HTTP_URL}/room/${slug}`);
    
    return response.data.room.id;
}

export default async function ChatRoom1(
    {params}: 
    {params: { slug: string}}
) {
   
    const slug =(await params).slug;
    const roomId =  await getRoomId(slug);

    return <ChatRoom id={roomId}/>
    
}