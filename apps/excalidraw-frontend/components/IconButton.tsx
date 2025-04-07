import {ReactNode} from 'react'

export default function IconButton({
    icon, onClick, activated
} : {
    icon: ReactNode,
    onClick: () => void,
    activated?: boolean
}) {
    
  return (
    <div className={`cursor-pointer rounded-3xl text-white p-2 m-1 hover:bg-[#51518d] ${activated && "bg-[#51518d]"} `} onClick={onClick}>
        {icon} 
    </div>
  )
}
