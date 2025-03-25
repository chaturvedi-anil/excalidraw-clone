"use client";

import { WS_URL } from '@/app/config';
import { initDraw } from '@/draw';
import { useEffect, useRef, useState} from 'react'
import { Canvas } from './Canvas';

export function RoomCanvas({roomId} : {roomId: string}) {
   
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
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