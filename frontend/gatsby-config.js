/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Dev Journal`,
    description: `A fast, modern blog CMS demo built with Gatsby, MDX, Redux, and Tailwind CSS.`,
    siteUrl: `https://example.com`,
    author: `Jane Doe`,
    social: {
      twitter: `@janedoe`
    },
    image: `/images/og-default.jpg`
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/admin`]
      }
    }
  ]
}
