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
  Flex,
  Divider,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CatoLogoSvg from "../components/cato-logo"

type ArchivePageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            date: string
            title: string
          }
        }
      }>
    }
  }
}

export const query = graphql`
  query archiveQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`

/**
 * @param data Data from graphql query
 * @returns Component to display list of all blogs
 */
const ArchivePage = ({ data }: ArchivePageProps) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Home" />

      <Flex
        direction="column"
        justify="center"
        align="center"
        centerContent
        bg="brand.500"
        py={16}
        px={0}
      >
        <CatoLogoSvg />

        <Box as="header">
          <Heading size="lg" align="center" mb={2}>
            Archive
          </Heading>
        </Box>
      </Flex>

      <Center>
        <List py={0} px={4} maxW="3xl">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <ListItem key={post.fields.slug} my={4}>
                <Box className="archive-post-item" p={4} textAlign="center">
                  <LinkBox as="article">
                    <Box as="header" mb={2}>
                      <Text fontSize="xs" color="gray">
                        {post.frontmatter.date}
                      </Text>
                      <Heading
                        size="md"
                        sx={{
                          ".archive-post-item:hover &": {
                            color: "brand.500",
                          },
                        }}
                      >
                        <LinkOverlay as={GatsbyLink} to={post.fields.slug}>
                          {title}
                        </LinkOverlay>
                      </Heading>
                    </Box>
                  </LinkBox>
                </Box>
                <Divider orientation="horizontal" maxW="sm" />
              </ListItem>
            )
          })}
        </List>
      </Center>
    </Layout>
  )
}

export default ArchivePage
