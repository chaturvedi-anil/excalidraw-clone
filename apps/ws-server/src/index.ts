import { WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prismaClient"
 
const wss = new WebSocket.Server({port: 8080});

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users:User[] = [];

const checkUser = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded == "string")  {
            return null;
        }

        if(!decoded || !(decoded as JwtPayload).userId){
            return null;
        }

        return decoded.userId;
    } catch (error) {
        return null;
    }
}
wss.on("connection", (ws, request) => {

    const url = request.url;   //ex:  ws://localhost:3000?token=123123

    //url = ["ws://localhost:3000", "?token=123123"];

    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token') ?? "";
    const userId = checkUser(token);

    if(userId == null){
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms:[],
        ws
    });

    ws.on("message", async (data) => {
        try {
            const parsedData = JSON.parse(data.toString());
            
            if (parsedData.type === "ping") {
                ws.send("pong");
                return;
            }

            const roomId = parsedData.roomId;

            if (!roomId) {
                ws.send(JSON.stringify({message: "roomId is required!!"}));
                return;    
            }

            const user = users.find(x => x.ws === ws);

            if (!user) {
                ws.send(JSON.stringify({message: "Invalid user!"}));
                return;
            }

            const isRoomPresent = await prismaClient.room.findUnique({
                where: {
                    id: parsedData.roomId,
                }
            })

            if (!isRoomPresent) {
                ws.send(JSON.stringify({message: "Invalid roomId!"}));
                return;
            }

            // join new room 
            if (parsedData.type === "join_room") {
                user?.rooms.push(parsedData.roomId);
                const isRoomCreated = user.rooms.find(x => x === roomId);
                if (isRoomCreated) {
                    ws.send(JSON.stringify({ message: "Room joined successfully!" }));
                } else {
                    ws.send(JSON.stringify({ message: "Failed to join room!" }));
                    return;
                }
            }

             // leave joined room 
            if (parsedData.type === "leave_room") {
                user.rooms = user?.rooms.filter(x => x !== parsedData.roomId);
                ws.send(JSON.stringify({ message: "Room leaved successfully!" }));
                return;
            }

            // chat
            if (parsedData.type === "chat") {
                const isChatAdded = await prismaClient.chat.create({
                    data:{
                        roomId,
                        message: parsedData.message,
                        userId
                    }
                })

                if (isChatAdded) {
                    users.map((user) => {
                        if (user.ws !== ws && user.rooms.includes(roomId)) {
                            user.ws.send(JSON.stringify({
                                type: "chat",
                                roomId: roomId,
                                message: parsedData.message,
                                
                            }))
                        }
                    })
                }
            }

            
        } catch (error) {
            console.error("Ws error : ", error);
            ws.send(JSON.stringify({message: "Invalid message format!!"}));
        }
    });
    ws.send(`Welcome to the websocket server`);
});