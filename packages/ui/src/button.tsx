"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: string,
  className?: string;
  onClick?: () => void,
  disabled?: boolean
}

export const Button = ({ children, className, variant, onClick, disabled}: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant ?? variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
