import {ReactNode} from 'react'

export default function IconButton({
    icon, onClick, activated
} : {
    icon: ReactNode,
    onClick: () => void,
    activated?: boolean
}) {
    
  return (
    <div className={`cursor-pointer text-white p-3 m-0.5 rounded-full ${activated ? "bg-[#51518d]" : "hover:bg-[#343436]"} `} onClick={onClick}>
        {icon} 
    </div>
  )
}
