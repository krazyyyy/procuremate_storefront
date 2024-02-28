import clsx from "clsx";
import Image from "next/image";
import React, { useEffect } from "react";
import { SVGRenderer } from "@modules/common/components/svg-renderer";

const ThumbnailImage = ({ svgHeight = 400, svgWidth = 400, src, objectFit, alt, height, width, className, placeholder = '/images/cat-1.png', svg = false }: {
  src: string,
  objectFit?: 'contain' | 'cover',
  alt?: string,
  height?: number,
  width?: number,
  svgHeight?: number,
  svgWidth?: number,
  className?: string,
  placeholder?: string,
  svg?: boolean
}) => {

  const [source, setSource] = React.useState<string>('/images/cat-1.png');
  useEffect(() => {
    if (src?.length > 0)
      setSource(src)
  }, [src])

  if (source.endsWith('svg') || source.startsWith('data:image/svg+xml') && svg) {
    return <div className="relative" style={{ height, width }}>
      <SVGRenderer height={svgHeight} width={svgWidth} url={source} />
    </div>
  }
  return <Image
    key={source}
    src={source}
    className={clsx(className, '')}
    objectFit={objectFit}
    onError={() => {
      setSource(placeholder)
    }}
    // blurDataURL={'/spinner.svg'}
    // placeholder="blur"
    height={height}
    width={width}
    alt={alt ?? ''} />
}

export default ThumbnailImage