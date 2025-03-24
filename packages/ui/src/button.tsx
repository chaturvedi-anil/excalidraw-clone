"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary",
  size: "sm" | "md" | "lg" | "xl",
  onClick?: () => void, 
}

const  buttonVariants = {
  "primary": "cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-100 font-medium rounded shadow-md hover:shadow-lg hover:shadow-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  "secondary": "cursor-pointer bg-white text-gray-700 font-medium rounded border border-gray-200 hover:text-indigo-600 hover:border-indigo-600 transition-all"
} 

const buttonSizes = {
  "sm" : "px-2 py-1 text-sm",
  "md" : "px-5 py-2.5 text-base",
  "lg" : "px-5 py-2.5 text-lg",
  "xl" : "px-8 py-4 text-xl"
}

export const Button = ({ children, variant, size, onClick }: ButtonProps) => {
  const buttonClass = `${buttonVariants[variant]} ${buttonSizes[size]}`
  
  return (
    <button
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
