"use client";

import { initDraw } from '@/draw';
import React, { useEffect, useRef } from 'react'

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current);

        }
    }, [canvasRef]);

    return (
        <div>   
            <canvas ref={canvasRef} width={2000} height={2000} className=' cursor-pointer'></canvas>
        </div>
    )
}

export default Canvas