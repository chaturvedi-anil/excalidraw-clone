import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

const Shapes = [
    {
        name: "rect", 
        icon: <RectangleHorizontalIcon />
    },
    {
        name: "circle", 
        icon: <Circle />
    },
    {
        name: "pencil", 
        icon: <Pencil />
    }
];

export function Canvas({roomId, socket} : {roomId: number, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState("rect");

    useEffect(() => {
        // @ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool]);
    
    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef]);
    return(
        <div>
            <canvas ref={canvasRef} className="" width={window.innerWidth} height={window.innerHeight}> </canvas>
            <TopbarComponent selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </div>
    )
}

function TopbarComponent({
    selectedTool, setSelectedTool
    } : {
        selectedTool: string, 
        setSelectedTool: (s: string) => void
}) {
   return (<div className="bg-white fixed top-3 left-5 rounded-md">
        <div className="flex gap-2">
            {Shapes.map((shape) => {
                return <IconButton key={shape.name} icon={shape.icon} onClick={() => setSelectedTool(shape.name)} activated={selectedTool === shape.name ? true : false} />
            } )}
        </div>
   </div>)
}