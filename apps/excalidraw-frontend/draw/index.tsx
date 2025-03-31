// import { HTTP_URL } from "@/app/config";
// import axios from "axios";



// export async function initDraw(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
//     const ctx = canvas.getContext("2d");

//     let existingShapes: Shape[] = await getExistingShapes(roomId);

//     if (!ctx) {
//         return;
//     }

//     socket.onmessage = (event) => {
//         const message = JSON.parse(event.data);

//         if(message.type == "chat"){
//             const parsedShape = JSON.parse(message.message);
//             existingShapes.push(parsedShape.shape);

//             clearCanvas(existingShapes, canvas, ctx);
//         }
//     }

//     clearCanvas(existingShapes, canvas, ctx);
// }

