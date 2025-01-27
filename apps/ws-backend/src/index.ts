import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prismaClient";

const wss = new WebSocketServer({port: 8080});

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];

const checkUser = (token: string):string | null => {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !(decoded as JwtPayload).userId) {
        return null;
    }

    // @ts-ignore
    return decoded.userId;
}

wss.on('connection', (ws: WebSocket, request) => {
    try {
        const url = request.url; 
        if (!url) {
            return;
        }
        
        const queryParams = new URLSearchParams(url.split('?')[1]);
        const token = queryParams.get('token') || "";
        const userId = checkUser(token);

        if(userId === null){
            ws.close();
            return;
        }
        
        users.push({
            ws,
            userId,
            rooms: []
        })

        ws.on("message", async (data) => {
            const parshedData = JSON.parse(data.toString());
            const messageType = parshedData.type;
            const user = users.find(x => x.ws === ws);
            const roomId = parshedData.roomId;
            
            switch(messageType){
                
                //--------------JOIN ROOM HANDLER----------------------------- 
                case "join_room": 
                    user?.rooms.push(parshedData.roomId);
                    users.map((user) => {
                        if (user.ws !== ws && user.rooms.includes(roomId)) {
                            user.ws.send(`new user with id ${userId} have joined the chat room!`);
                        }
                    });
                    break;
                
                // -------------LEAVE ROOM HANDLER----------------------------
                case "leave_room": 
                    if (!user) {
                        return;
                    }
                    user.rooms = user?.rooms.filter(x => x === parshedData.roomId);
                    users.map((user) => {
                        if (user.ws !== ws && user.rooms.includes(roomId)) {
                            user.ws.send(`user with id ${userId} has left the chat room!`);
                        }
                    });
                    break;

                // --------------CHAT HANDLER---------------------------------------
                case "chat": 
                    const message = parshedData.message;
                    
                    await prismaClient.chat.create({
                        data:{
                            roomId,
                            message,
                            userId 
                        }
                    })

                    users.map((user) => {
                        if (user.ws !== ws && user.rooms.includes(roomId)) {
                            user.ws.send(JSON.stringify({
                                type: "chat",
                                message: message,
                                roomId
                            }))
                        }
                    });
                    break;
                
                default: ws.send("Invalid message type!")
                
            }
          
        })
    } catch (error) {
        ws.send(JSON.stringify(error));
    }
    
});