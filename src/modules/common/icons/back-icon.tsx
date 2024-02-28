import React from 'react'
import { IconProps } from "types/icon"


const BackIcon: React.FC<IconProps> = ({
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
      <path d="M2.89591 10L10.8629 1.74328C11.0457 1.55379 11.0457 1.24655 10.8629 1.05712L9.98006 0.142137C9.8923 0.0511109 9.77319 1.7088e-06 9.64903 1.68709e-06C9.52487 1.66538e-06 9.40576 0.0511109 9.31799 0.142137L0.137129 9.65692C-0.0457119 9.84641 -0.0457119 10.1537 0.137129 10.3431L9.31793 19.8579C9.40569 19.9489 9.5248 20 9.64896 20C9.77312 20 9.89223 19.9489 9.98 19.8579L10.8628 18.9429C11.0456 18.7534 11.0456 18.4462 10.8628 18.2567L2.89591 10Z" fill={color} />

    </svg >
  )
}

export default BackIcon


