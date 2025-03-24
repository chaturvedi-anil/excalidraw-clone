import React from 'react'

interface inputProps {
    type: string,
    placeholder: string,
    size: "md" | "lg",
}   

const defaultStyle = "outline outline-gray-300 rounded text-gray font-mono capitalize focus:outline-2"
const inputSizes = {
    "md" : "py-1 px-2 text-base",
    "lg" : "py- px-5 text-lg",
}

export default function Input({type, placeholder, size}: inputProps) {
    const inputStyle = `${inputSizes[size]} ${defaultStyle}`
    return (
        <input 
            className={inputStyle}
            type={type}
            placeholder={placeholder}  
        />
    )
}
