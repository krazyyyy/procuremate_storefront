import React from "react"
import { IconProps } from "types/icon"

const Cart: React.FC<IconProps> = ({
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
      <path d="M1.7 17H15.3C16.235 17 17 16.235 17 15.3V4.25H13.5235C13.1168 1.84195 11.022 0 8.5 0C5.97805 0 3.88322 1.84195 3.47692 4.25H0V15.3C0 16.235 0.765 17 1.7 17ZM8.5 1.7C10.0806 1.7 11.4091 2.78588 11.7882 4.25H5.21178C5.59088 2.78588 6.91943 1.7 8.5 1.7ZM3.4 5.95V7.65H5.1V5.95H11.9V7.65H13.6V5.95H15.3V15.3H1.7V5.95H3.4Z" fill={color} />

    </svg>
  )
}

export default Cart
