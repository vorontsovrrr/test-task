import React from 'react'
import { Helmet } from 'react-helmet'

export interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
}

export function SEO({ title, description, image, url }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      {url ? <meta property="og:url" content={url} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
    </Helmet>
  )
}


