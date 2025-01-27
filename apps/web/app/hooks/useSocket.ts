import { useEffect, useState } from "react";
import { WSBACKEND_URL } from "../config";

export const useSocket = () => {
    const [loading, setLoading] = useState(true);
    const [socket, setsocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new  WebSocket(WSBACKEND_URL);

        ws.onopen = () => {
            setLoading(false);
            setsocket(ws);
         }
    }, []);


    return {socket, loading};

}