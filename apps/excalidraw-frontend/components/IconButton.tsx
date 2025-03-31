import {ReactNode} from 'react'

export default function IconButton({
    icon, onClick, activated
} : {
    icon: ReactNode,
    onClick: () => void,
    activated?: boolean
}) {
    
  return (
    <div className={`cursor-pointer rounded-full p-2 m-1 hover:bg-gray-300 ${activated && "bg-gray-300"} `} onClick={onClick}>
        {icon} 
    </div>
  )
}
