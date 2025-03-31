import axios from "axios";
import { HTTP_URL } from "@/app/config"; 

export async function getExistingShapes(roomId: number)    {
    try {
        const res = await axios.get(`${HTTP_URL}/chats/${roomId}`);    
        const messages = res.data?.messages;

        const shapes = messages?.map((x: {message: string }) => {
            const messageData = JSON.parse(x.message);
            return messageData.shape;
        })  
        
        return shapes;
    } catch (error) {
        // console.log("getExisitngshapes error : ", error);
        return;
    }
}
