import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "diamond";
    centerX: number;
    centerY: number;
    size: number;
};

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: number;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private lastX = 0;
    private lastY = 0;
    private selectedTool: Tool = "rect"; // ✅ Default tool is now rect
    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.forEach((shape) => {
            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "diamond") {
                const { centerX, centerY, size } = shape;
                this.ctx.beginPath();
                this.ctx.moveTo(centerX, centerY - size);
                this.ctx.lineTo(centerX + size, centerY);
                this.ctx.lineTo(centerX, centerY + size);
                this.ctx.lineTo(centerX - size, centerY);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        });
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        this.lastX = this.startX;
        this.lastY = this.startY;
    };

    mouseUpHandler = (e: MouseEvent) => {
        if (!this.clicked) return;
        this.clicked = false;

        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        const width = currentX - this.startX;
        const height = currentY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height,
            };
        } else if (selectedTool === "circle") {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            shape = {
                type: "circle",
                centerX: this.startX + width / 2,
                centerY: this.startY + height / 2,
                radius,
            };
        } else if (selectedTool === "diamond") {
            const size = Math.min(Math.abs(width), Math.abs(height)) / 2;
            shape = {
                type: "diamond",
                centerX: this.startX + width / 2,
                centerY: this.startY + height / 2,
                size,
            };
        }

        if (!shape) return;

        this.existingShapes.push(shape);
        this.clearCanvas();

        this.socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }),
                roomId: this.roomId,
            })
        );
    };

    mouseMoveHandler = (e: MouseEvent) => {
        if (!this.clicked) return;

        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        const width = currentX - this.startX;
        const height = currentY - this.startY;

        const selectedTool = this.selectedTool;

        this.clearCanvas();

        if (selectedTool === "rect") {
            this.ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (selectedTool === "circle") {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
        } else if (selectedTool === "pencil") {
            const shape: Shape = {
                type: "pencil",
                startX: this.lastX,
                startY: this.lastY,
                endX: currentX,
                endY: currentY,
            };

            this.existingShapes.push(shape);

            this.socket.send(
                JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: this.roomId,
                })
            );

            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(currentX, currentY);
            this.ctx.stroke();
            this.ctx.closePath();

            this.lastX = currentX;
            this.lastY = currentY;
        } else if (selectedTool === "diamond") {
            const size = Math.min(Math.abs(width), Math.abs(height)) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY - size);
            this.ctx.lineTo(centerX + size, centerY);
            this.ctx.lineTo(centerX, centerY + size);
            this.ctx.lineTo(centerX - size, centerY);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    };

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}
