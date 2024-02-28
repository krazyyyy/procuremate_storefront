import React from "react"
import { IconProps } from "types/icon"

const Heart: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg {...attributes} viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.2307 4.04293C7.46154 -1.2286 1 0.890255 1 6.26788C1 11.6455 11.7693 19 11.7693 19C11.7693 19 22 11.3503 22 6.26788C22 1.18539 16.0769 -1.22859 12.3077 4.04293L11.7693 4.46399L11.2307 4.04293Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


  )
}



export default Heart
