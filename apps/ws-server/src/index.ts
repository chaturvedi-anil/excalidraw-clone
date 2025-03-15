import { WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = "token";
 
const wss = new WebSocket.Server({port: 8080});

wss.on("connection", (ws, request) => {

    const url = request.url;   //ex:  ws://localhost:3000?token=123123

    //url = ["ws://localhost:3000", "?token=123123"];

    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token') ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string")  {
        ws.close();
        return;
    }

    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }

    ws.on("message", (data) => {
        ws.send("pong");
    });
    ws.send(`Welcome to the websocket server`);
});