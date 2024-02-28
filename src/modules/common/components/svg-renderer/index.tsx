import React from "react"

export const SVGRenderer = ({ url, height = 400, width = 400 }: { url: string, height?: number, width?: number }) => {
  return <object width={width} height={height} type="image/svg+xml" data={url} />
}