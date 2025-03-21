"use client";

import { useSocket } from "@/hook/useSocket";
import { useEffect, useState } from "react";


export function ChatRoomClient ({
    messages, id
} : {
    messages:{message: string}[] ,
    id: number
}){
    const [chats, setChats] = useState(messages); 
    const [currentMessage, setCurrentMessage]  = useState("");
    const {socket, loading} = useSocket();

    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats(c => [...c, parsedData.message]);
                }
            }
        }
    }, [socket, loading, id]);


    return(
        <div>
            {chats.map(c => <div> {c.message} </div>)}

            <input 
                type="text" 
                className="mt-3 outline px-2 py-3 text-md"  
                placeholder="Type message...."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button
                onClick={() => {
                    socket?.send(JSON.stringify({
                        type: "chat",
                        roomId: id,
                        message: currentMessage
                    }))
                    
                    setCurrentMessage("");
                }}   
            >Send Message</button>
        </div>
    )
}