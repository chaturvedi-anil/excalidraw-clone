"use client";

import { ReactNode } from "react";

interface cardProps {
  headingText: string,
  children: ReactNode
}

export default function Card({headingText, children} : cardProps) {
  return (
    <div className="shadow-[0px_3px_10px_rgb(147,51,234,0.2)] bg-white rounded flex flex-col justify-between items-center">
      <div className="shadow-[0px_1px_0px_rgb(147,51,234,0.2)] w-full flex justify-center p-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {headingText}
          </span>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
