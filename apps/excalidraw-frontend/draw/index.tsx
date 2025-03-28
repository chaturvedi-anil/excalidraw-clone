import { HTTP_URL } from "@/app/config";
import axios from "axios";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number, 
    height : number
} | {
    type: "circle",
    centerX: number,
    cneterY: number,
    radius: number
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if (!ctx) {
        return;
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if(message.type == "chat"){
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);

            clearCanvas(existingShapes, canvas, ctx);
        }
    }

    clearCanvas(existingShapes, canvas, ctx);
    let clicked = false; 
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width: width,
            height: height
        }
        existingShapes.push(shape);
        
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({shape}),
            roomId
        }));
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearCanvas(existingShapes, canvas, ctx);

            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(startX, startY, width, height);
            // ctx?.strokeRect(250, 250, 200, 100);
            // canvasFunctionArgu(starting left, starting top, width, height)
        }
    });
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    existingShapes && existingShapes.map((shape) => {
        if(shape.type === "rect") {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}

async function getExistingShapes(roomId: number)    {
    try {
        const res = await axios.get(`${HTTP_URL}/chats/${roomId}`);    
        const messages = res.data?.messages;

        const shapes = messages?.map((x: {message: string }) => {
            const messageData = JSON.parse(x.message);
            return messageData.shape;
        })  
        
        return shapes;
    } catch (error) {
        console.log("getExisitngshapes error : ", error);
        return;
    }
}