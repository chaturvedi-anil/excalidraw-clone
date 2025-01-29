"use client";

import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

export const ChatRoomClient = ({messages, id}: {messages: {message: string}[], id: number}) => {
    const [chats, setchats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");
    const {socket, loading} = useSocket();

    const handleMessageSend = async () => {
        socket?.send(JSON.stringify({
            "type": "chat",
            "roomId": id,
            "message": currentMessage 
        }))

        setCurrentMessage("");

    };

    useEffect(() => {
        if(socket && !loading){

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const parshedData = JSON.parse(event.data);
                if(parshedData.type === "chat"){
                    setchats(c => [...c, {message: parshedData.message}]);
                }
            }
        }
    }, [socket, loading, id]);

    return (
        <div>
           <div>
                {chats.map((m, index) => (
                        <div key={index}>{m.message}</div>
                ))}
           </div>

           <div>
                <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder='Enter Your Message...' />
                <button onClick={handleMessageSend}>Send Message</button>
           </div>
        </div>
    )
}
