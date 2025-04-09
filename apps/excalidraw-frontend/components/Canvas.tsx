import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Hand, Diamond, MoveRight ,Circle, Pencil, Minus, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "rect" | "circle" | "pencil" | "hand" | "diamond" | "moverightarrow" | "line";

export function Canvas({roomId, socket} : {roomId: number, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("rect");

    useEffect(() => {
       game?.setTool(selectedTool);
    }, [selectedTool]);
    
    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }
    }, [canvasRef]);
    return(
        <div className="flex justify-center">
            <canvas ref={canvasRef} className="cursor-crosshair" width={window.innerWidth} height={window.innerHeight}> </canvas>
            <TopbarComponent selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </div>
    )
}

function TopbarComponent({
    selectedTool, setSelectedTool
    } : {
        selectedTool: string, 
        setSelectedTool: (t: Tool) => void
}) {
   return (<div className="bg-[#232329] fixed top-5 px-2 rounded-md">
        <div className="flex gap-1">
        <IconButton icon={<Hand size={20} />} onClick={() => setSelectedTool("hand")} activated={selectedTool === "hand" ? true : false} />
        <IconButton icon={<RectangleHorizontalIcon size={20} />} onClick={() => setSelectedTool("rect")} activated={selectedTool === "rect" ? true : false} />
        <IconButton icon={<Circle size={20} />} onClick={() => setSelectedTool("circle")} activated={selectedTool === "circle" ? true : false} />
        <IconButton icon={<Diamond size={20} />} onClick={() => setSelectedTool("diamond")} activated={selectedTool === "diamond" ? true : false} />
        <IconButton icon={<Pencil size={20} />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil" ? true : false} />
        <IconButton icon={<MoveRight size={20}/>} onClick={() => setSelectedTool("moverightarrow")} activated={selectedTool === "moverightarrow" ? true : false} />
        <IconButton icon={<Minus size={20}/>} onClick={() => setSelectedTool("line")} activated={selectedTool === "line" ? true : false} />
            {/* {Shapes.map((shape) => {
                return <IconButton key={shape.name} icon={shape.icon} onClick={() => setSelectedTool(shape.name)} activated={selectedTool === shape.name ? true : false} />
            } )} */}
        </div>
   </div>)
}