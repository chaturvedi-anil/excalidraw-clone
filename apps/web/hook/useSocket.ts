import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    
    useEffect(()=> {
        const ws = new WebSocket(`${WS_URL}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNDA4YjcxYi1mODBiLTRhMDYtYWZiYy03OWJmZDhkMDhlMzMiLCJpYXQiOjE3NDI5NzI0OTF9.eAxFwBZ8B9Ljjd6hJJG7PTdheIVBGGWIJ45IZMPolgc`);
        ws.onopen = ()=>{
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket, loading 
    }
}