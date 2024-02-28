import NextHead from "next/head"
import React from "react"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
  canonical?: string | null
}

const Head: React.FC<HeadProps> = ({ title, description, image, canonical }) => {
  return (
    <NextHead>
      <title>{`${title ?? ''}`}</title>
      <meta name="name" content={title} />
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={image} />}
      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" href="/images/fav_icon.svg" />
    </NextHead>
  )
}

export default Head
