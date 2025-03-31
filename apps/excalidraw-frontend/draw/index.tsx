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
    centerY: number,
    radius: number
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number, 
    endY: number
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
        let shape: Shape | null = null;

        // Ensure correct starting point for negative width/height
        const correctedX = width < 0 ? startX + width : startX;
        const correctedY = height < 0 ? startY + height : startY

        // @ts-ignore
        const selectedTool = window.selectedTool;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: correctedX,
                y: correctedY,
                width: Math.abs(width),
                height: Math.abs(height)
            }
        } else if (selectedTool === "circle") {
            const radius = Math.abs(Math.max(width, height) / 2); 
            shape = {
                type: "circle",
                centerX: correctedX + radius,
                centerY: correctedY + radius,
                radius: radius
            }
        }
        
        if(!shape) return;

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

            // @ts-ignore
            const selectedTool = window.selectedTool;

            if(selectedTool === "rect"){
                ctx.strokeRect(startX, startY, width, height);
            } else if (selectedTool === "circle") {
                const centerX = startX + width / 2;
                const centerY = startY + height / 2;
                const radius = Math.abs(Math.max(width, height) / 2);
                ctx.beginPath();
                
                ctx.arc(centerX, centerY, radius,  0, Math.PI * 2);
                ctx.stroke();
               
            } else if (selectedTool === "pencil") {

            }
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
        } else if(shape.type === "circle"){
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius,  0, Math.PI * 2);
            ctx.stroke();
            
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
        // console.log("getExisitngshapes error : ", error);
        return;
    }
}