"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: string,
  className?: string;
  onClickHandler?: () => void,
  disabled?: boolean
}

export const Button = ({ children, className, variant, onClickHandler, disabled}: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant ?? variant}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
