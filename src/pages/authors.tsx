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
    allMarkdownRemark(
      sort: { fields: [frontmatter___authorTwitter], order: ASC }
    ) {
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
 * @returns Component to display list of all authors
 */
const AuthorsPage = ({ data }: AuthorsPageProps) => {
  let authors = data.allMarkdownRemark.edges.map(edge => edge.node.frontmatter)

  /** Collect author objects with unique `author` & `authorTwitter` pair */
  const distinctAuthors: {
    [key: string]: { author: string; authorTwitter: string }
  } = {}
  authors.forEach(authorData => {
    /** Remove leading @ char from twitter username, if present*/
    let authorTwitter: string = authorData.authorTwitter ?? ``
    authorTwitter = authorTwitter.startsWith(`@`)
      ? authorTwitter.slice(1)
      : authorTwitter

    const key = authorData.authorTwitter
      ? authorData.authorTwitter
      : authorData.author
    distinctAuthors[key] = {
      author: authorData.author,
      authorTwitter: authorData.authorTwitter ?? ``,
    }
  })

  authors = Object.values(distinctAuthors)

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
          {authors.map((authorData, i) => {
            return (
              <ListItem key={i} my={4}>
                <Box className="archive-post-item" p={4} textAlign="center">
                  <LinkBox as="article">
                    <Box as="header" mb={2}>
                      {authorData.authorTwitter && (
                        <HStack spacing={1} mb={2}>
                          <Icon as={FaTwitter} w={4} h={4} color="brand.500" />
                          <Text fontSize="sm" color="gray.400">
                            {`@${authorData.authorTwitter}`}
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
                        {authorData.authorTwitter ? (
                          <LinkOverlay
                            href={
                              authorData.authorTwitter
                                ? `https://twitter.com/${authorData.authorTwitter}`
                                : `#`
                            }
                            isExternal
                          >
                            {authorData.author}
                          </LinkOverlay>
                        ) : (
                          authorData.author
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
