import { WebSocket } from "ws";

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", (ws) => {

    ws.on("message", (data) => {
        ws.send("pong");
    });
    ws.send(`Welcome to the websocket server`);
});