import { useEffect, useState } from "react";
import { WSBACKEND_URL } from "../config";

export const useSocket = () => {
    const [loading, setLoading] = useState(true);
    const [socket, setsocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WSBACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZTRmMWViZS0yY2RjLTQwOTUtOWE0Zi1jZDAxN2VjZjIwODgiLCJpYXQiOjE3MzgxNjc0ODJ9.AEEVh3TkYexZy2r5foBpwQurjo4ByMYoiIDp5QZcxqg`);

        ws.onopen = () => {
            setLoading(false);
            setsocket(ws);
         }
    }, []);


    return {socket, loading};

}