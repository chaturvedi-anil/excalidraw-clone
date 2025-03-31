import {ReactNode} from 'react'

export default function IconButton({
    icon, onClick, activated
} : {
    icon: ReactNode,
    onClick: () => void,
    activated?: boolean
}) {
    
  return (
    <div className={`cursor-pointer rounded-full text-white p-2 m-1 hover:bg-black ${activated && "bg-black"} `} onClick={onClick}>
        {icon} 
    </div>
  )
}
