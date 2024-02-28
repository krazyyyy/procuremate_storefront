
import React from "react"
import { IconProps } from "types/icon"

const CloseIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path d="M20 2.857L17.143 0L10 7.143L2.857 0L0 2.857L7.143 10L0 17.143L2.857 20L10 12.857L17.143 20L20 17.143L12.857 10L20 2.857Z" fill={color} />

    </svg>
  )
}

export default CloseIcon
