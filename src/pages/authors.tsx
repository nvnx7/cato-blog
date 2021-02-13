import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Icon,
  Center,
  Box,
  Flex,
  Divider,
  HStack,
} from "@chakra-ui/react"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CatoLogoSvg from "../components/cato-logo"

type AuthorsPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            author: string
            authorTwitter: string
          }
        }
      }>
    }
  }
}

export const query = graphql`
  query authorsQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            author
            authorTwitter
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
const AuthorsPage = ({ data }: AuthorsPageProps) => {
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
            Authors
          </Heading>
        </Box>
      </Flex>

      <Center>
        <List py={0} px={4} maxW="3xl">
          {posts.map((post, i) => {
            /** Remove leading @ char from twitter username, if present*/
            let authorTwitter: string = post.frontmatter.authorTwitter ?? ``
            authorTwitter = authorTwitter.startsWith(`@`)
              ? authorTwitter.slice(1)
              : authorTwitter

            return (
              <ListItem key={i} my={4}>
                <Box className="archive-post-item" p={4} textAlign="center">
                  <LinkBox as="article">
                    <Box as="header" mb={2}>
                      {authorTwitter && (
                        <HStack spacing={1} mb={2}>
                          <Icon as={FaTwitter} w={4} h={4} color="brand.500" />
                          <Text fontSize="sm" color="gray.400">
                            {`@${authorTwitter}`}
                          </Text>
                        </HStack>
                      )}
                      <Heading
                        size="md"
                        sx={{
                          ".archive-post-item:hover &": {
                            color: "brand.500",
                          },
                        }}
                      >
                        {authorTwitter ? (
                          <LinkOverlay
                            href={
                              authorTwitter
                                ? `https://twitter.com/${authorTwitter}`
                                : `#`
                            }
                            isExternal
                          >
                            {post.frontmatter.author}
                          </LinkOverlay>
                        ) : (
                          post.frontmatter.author
                        )}
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

export default AuthorsPage
