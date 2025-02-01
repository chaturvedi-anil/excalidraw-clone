"use client";

interface InputProps {
  type?: string,
  className?: string,
  placeholder?: string,
  value?: string,
}

const Input = ({type, className, placeholder, value} : InputProps) => {
  return <input type={type} className={className} placeholder={placeholder} value={value} />
};

export { Input }

