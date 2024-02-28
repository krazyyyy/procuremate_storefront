import React from "react"
import { IconProps } from "types/icon"

const MenuIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg {...attributes} width={size} height={size} viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.62 4.16C1.54 4.16 0.68 3.34 0.68 2.2C0.68 1.04 1.54 0.28 2.62 0.28C3.7 0.28 4.56 1.04 4.56 2.2C4.56 3.34 3.7 4.16 2.62 4.16ZM7.85438 4.16C6.77438 4.16 5.91438 3.34 5.91438 2.2C5.91438 1.04 6.77438 0.28 7.85438 0.28C8.93438 0.28 9.79438 1.04 9.79438 2.2C9.79438 3.34 8.93438 4.16 7.85438 4.16ZM13.0888 4.16C12.0088 4.16 11.1488 3.34 11.1488 2.2C11.1488 1.04 12.0088 0.28 13.0888 0.28C14.1688 0.28 15.0288 1.04 15.0288 2.2C15.0288 3.34 14.1688 4.16 13.0888 4.16Z" fill="black" />
    </svg>
  )
}

export default MenuIcon
