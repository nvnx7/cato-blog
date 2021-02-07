import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Center,
  Box,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

type BlogIndexProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    allMarkdownRemark: {
      nodes: Array<{
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
          description: string
        }
      }>
    }
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`

const BlogIndex = ({ data }: BlogIndexProps) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout title={data.site.siteMetadata?.description}>
      <SEO title="Home" />
      <Center>
        <List py={8} px={4} maxW="3xl">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <ListItem key={post.fields.slug} my={8}>
                <Box
                  className="post-item"
                  boxShadow="2xl"
                  p="6"
                  rounded="md"
                  bg="white"
                >
                  <LinkBox as="article">
                    <Box as="header" mb={2}>
                      <Heading
                        size="md"
                        sx={{
                          ".post-item:hover &": {
                            color: "brand.500",
                          },
                        }}
                      >
                        <LinkOverlay as={GatsbyLink} to={post.fields.slug}>
                          {title}
                        </LinkOverlay>
                      </Heading>
                      <Text fontSize="xs" color="gray">
                        {post.frontmatter.date}
                      </Text>
                    </Box>

                    <Text as="section">
                      {post.frontmatter.description || post.excerpt}
                    </Text>
                  </LinkBox>
                </Box>
              </ListItem>
            )
          })}
        </List>
      </Center>
    </Layout>
  )
}

export default BlogIndex
