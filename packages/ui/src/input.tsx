"use client";

interface InputProps {
  type: string,
  className?: string,
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

const Input = ({type, className, placeholder, value, onChange} : InputProps) => {
  return <input type={type} className={className} placeholder={placeholder} value={value} onChange={onChange}/>
};

export { Input }

