import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Hand, Diamond, MoveRight ,Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "rect" | "circle" | "pencil" | "hand";

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
        <IconButton icon={<Hand />} onClick={() => setSelectedTool("hand")} activated={selectedTool === "hand" ? true : false} />
        <IconButton icon={<RectangleHorizontalIcon />} onClick={() => setSelectedTool("rect")} activated={selectedTool === "rect" ? true : false} />
        <IconButton icon={<Circle />} onClick={() => setSelectedTool("circle")} activated={selectedTool === "circle" ? true : false} />
        <IconButton icon={<Pencil />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil" ? true : false} />
        <IconButton icon={<MoveRight />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil" ? true : false} />
        <IconButton icon={<Diamond />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil" ? true : false} />
            {/* {Shapes.map((shape) => {
                return <IconButton key={shape.name} icon={shape.icon} onClick={() => setSelectedTool(shape.name)} activated={selectedTool === shape.name ? true : false} />
            } )} */}
        </div>
   </div>)
}