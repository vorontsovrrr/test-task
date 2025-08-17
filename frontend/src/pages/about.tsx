import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { SiteLayout } from '../components/layout/site-layout'

interface AboutData {
  site: { siteMetadata: { title: string, description: string, author: string, siteUrl: string } }
}

export default function AboutPage({ data }: PageProps<AboutData>) {
  const { site } = data
  return (
    <SiteLayout
      title={`About • ${site.siteMetadata.title}`}
      description={site.siteMetadata.description}
      canonicalUrl={`${site.siteMetadata.siteUrl}/about/`}
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <StaticImage src="../images/icon.png" alt="Author avatar" width={80} height={80} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{site.siteMetadata.author}</h1>
            <p className="mt-1 text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
          </div>
        </div>
        <p className="prose prose-slate mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </SiteLayout>
  )
}

export const pageQuery = graphql`
  {
    site { siteMetadata { title description author siteUrl } }
  }
`


