"use client";

import { WS_URL } from '@/app/config';
import { useEffect, useRef, useState} from 'react'
import { Canvas } from './Canvas';

export function RoomCanvas({roomId} : {roomId: number}) {
   
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYjhmMmIyNC1jNGE2LTRiNzItYWY5MC01ZjcwZTA3ZjY2ZjMiLCJpYXQiOjE3NDMzMjAxODl9.kJJuKv-koOLfczLfDQ3Jx7t9XIl7s55VVr58lKev6AI`);

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
        <div className=''>
            <button></button>
        </div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>
    )
}