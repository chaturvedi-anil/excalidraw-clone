"use client";

import { WS_URL } from '@/app/config';
import { useEffect, useRef, useState} from 'react'
import { Canvas } from './Canvas';

export function RoomCanvas({roomId} : {roomId: number}) {
   
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNDA4YjcxYi1mODBiLTRhMDYtYWZiYy03OWJmZDhkMDhlMzMiLCJpYXQiOjE3NDI5NzI0OTF9.eAxFwBZ8B9Ljjd6hJJG7PTdheIVBGGWIJ45IZMPolgc`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId,
            }));
        }
    }, [])

    if(!socket){
        return <div className=''>
            Connecting to server...
        </div>
    }
    return (<div className='bg-white'>
        <Canvas roomId={roomId} socket={socket}/>
    </div>
    )
}