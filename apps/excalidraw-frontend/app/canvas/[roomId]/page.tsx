"use client";

import { initDraw } from '@/draw';
import { useEffect, useRef} from 'react'


export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current);
        }
    }, [canvasRef]);
    return (
        <div className='bg-white'>
            <canvas ref={canvasRef} width={1900} height={860}>
                Canvas
            </canvas>
        </div>
    )
}
