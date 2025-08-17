import React from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import JsonPostTemplate from '../../../templates/json-post-template'

export default JsonPostTemplate

export const query = graphql`
  query JsonPostBySlug($slug: String!) {
    site { siteMetadata { title description siteUrl } }
    jsonPostsJson(slug: { eq: $slug }) {
      title
      slug
      date
      author
      content
      draft
    }
  }
`


