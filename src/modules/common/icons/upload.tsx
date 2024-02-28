import React from "react"
import { IconProps } from "types/icon"

const Upload: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}>
      <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17.1667V28.0935C2 28.9214 2.3172 29.7155 2.88183 30.301C3.44645 30.8865 4.21225 31.2154 5.01075 31.2154H26.086C26.8845 31.2154 27.6503 30.8865 28.2149 30.301C28.7796 29.7155 29.0968 28.9214 29.0968 28.0935V17.1667" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.7188 8.42535L15.5467 2.18152L9.37466 8.42536" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5469 23.4105L15.5469 5.45949" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    </svg>

  )
}

export default Upload
