import React from 'react'
import { IconProps } from "types/icon"


const ForwardIcon: React.FC<IconProps> = ({
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
      <path d="M8.10409 10L0.137132 18.2567C-0.0457088 18.4462 -0.0457088 18.7535 0.137132 18.9429L1.01994 19.8579C1.1077 19.9489 1.22681 20 1.35097 20C1.47513 20 1.59424 19.9489 1.68201 19.8579L10.8629 10.3431C11.0457 10.1536 11.0457 9.84635 10.8629 9.65692L1.68207 0.142135C1.5943 0.0511082 1.47519 -1.07466e-06 1.35103 -1.06381e-06C1.22687 -1.05295e-06 1.10777 0.0511083 1.02 0.142135L0.137193 1.05712C-0.0456474 1.24661 -0.0456473 1.55385 0.137193 1.74328L8.10409 10Z" fill={color} />
    </svg >
  )
}

export default ForwardIcon


