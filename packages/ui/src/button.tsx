"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary",
  className?: string;
  onClick?: () => void,
}
const variants={
  "primary" : "rounded-md px-5 py-2 w-full text-xl mt-4 bg-black text-white font-semibold",
  "secondary" : "rounded-md px-5 py-2 w-full text-xl mt-4 outline text-black font-semibold" 
}
export const Button = ({ children, className, variant, onClick}: ButtonProps) => {
  return (
    <button
      className={`${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
