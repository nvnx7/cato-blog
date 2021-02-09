import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

/**
 * @param title Document title (title on browser tab)
 * @param description Document metadata description
 * @param lang Document metadata lang (default - en)
 * @param meta List of metadata objects to be put in document head
 */
type SEOTypes = {
  title: string
  description?: string
  lang?: string
  meta?: Array<any>
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        social {
          twitter
        }
      }
    }
  }
`

const SEO = ({ title, description = "", lang = "en", meta = [] }: SEOTypes) => {
  const { site } = useStaticQuery(query)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : `%s`}
      meta={([
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ] as Array<any>).concat(meta)}
    />
  )
}

export default SEO
