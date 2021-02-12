import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import {
  List,
  ListItem,
  Link,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Center,
  Box,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CatoLogoSvg from "../components/CatoLogoSvg"

type BlogPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string
          fields: {
            slug: string
          }
          frontmatter: {
            date: string
            title: string
            description: string
          }
        }
      }>
    }
  }

  pageContext: {
    currentPage: number
    numPages: number
  }
}

export const query = graphql`
  query pageQuery($skip: Int, $limit: Int) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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

    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

/**
 * @param data Data from graphql query
 * @param pageContext Context data passed as prop by Gatsby (see gatsby-node.js)
 * @returns Component to display paginated list of blogs
 *
 * @description Note that this template also produces index page (path - "/"), which is
 * normally found as src/pages/index.tsx. This page defaults to page 1 of paginated list.
 */
const BlogPage = ({ data, pageContext }: BlogPageProps) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  const currentPage: number = pageContext.currentPage
  const numPages: number = pageContext.numPages

  const isFirst: boolean = currentPage === 1
  const isLast: boolean = currentPage === numPages

  /**
   * Link to previous list of posts - equal to root ("/") if current page is first page
   * or second page
   */
  const prevPage: string =
    isFirst || currentPage === 2 ? "/" : `/${currentPage - 1}`

  /**
   * Link to next list of posts - equal to last if current page is last page
   */
  const nextPage: string = isLast ? `/${numPages}` : `/${currentPage + 1}`

  /**
   * Max number of numbered navigation buttons to display
   */
  const maxNavButtons = 8

  /**
   * List of navigation button elements, maximum @const maxNavButtons buttons
   */
  const navButtons = Array.from({
    length: Math.min(maxNavButtons, numPages),
  }).map((_, i) => {
    let pageNo: number

    /** If number of pages/buttons is less than @const maxNavButtons return all*/
    if (numPages <= maxNavButtons) pageNo = i + 1
    /**
     * If number of pages/buttons counting from @const currentPage is less
     * than @const maxNavButtons return last @const maxNavButtons buttons
     */ else if (currentPage + maxNavButtons > numPages)
      pageNo = numPages - maxNavButtons + 1 + i
    /**
     * Else return @const maxNavButtons number of buttons counting from @const currentPage
     */ else pageNo = currentPage + i

    return (
      <Link
        key={`pagination-number${pageNo}`}
        as={GatsbyLink}
        to={`/${pageNo === 1 ? "" : pageNo}`}
        p={1}
        /** Differentiate current page with color & weight */
        color={currentPage === pageNo ? `brand.500` : `brand.900`}
        fontWeight={currentPage === pageNo ? `bold` : `normal`}
      >
        {pageNo}
      </Link>
    )
  })

  if (posts.length === 0) {
    return (
      <Layout>
        <SEO title={"All posts"} />
        <Text p={32}>
          Uh..oh. Looks like no posts are live yet. Stay Tuned!
        </Text>
      </Layout>
    )
  }

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
            {data.site.siteMetadata?.description}
          </Heading>
        </Box>
      </Flex>

      <VStack>
        <List py={8} px={4} maxW="3xl">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <ListItem key={post.fields.slug} my={8}>
                <Box
                  className="post-item"
                  boxShadow="xl"
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

        {numPages <= 1 ? (
          ``
        ) : (
          <HStack spacing={8} p={4} maxW="3xl">
            <LinkBox
              w="120px"
              h="40px"
              bg="brand.500"
              rounded="md"
              boxShadow="xl"
              color="white"
              fontWeight="bold"
            >
              <Center h="100%">
                <LinkOverlay as={GatsbyLink} to={prevPage} rel="prev">
                  Previous
                </LinkOverlay>
              </Center>
            </LinkBox>

            <HStack spacing={2}>
              {/** Leading ellipses to indicate presence of more leading buttons, linking to previous pages*/}
              {isFirst || numPages <= maxNavButtons ? `` : <Text>...</Text>}

              {navButtons}

              {/** Trailing ellipses to indicate presence of more trailing buttons, linking to next pages*/}
              {currentPage + maxNavButtons - 1 >= numPages ? (
                ``
              ) : (
                <Text>...</Text>
              )}
            </HStack>

            <LinkBox
              w="120px"
              h="40px"
              bg="brand.500"
              rounded="md"
              boxShadow="xl"
              color="white"
              fontWeight="bold"
            >
              <Center h="100%">
                <LinkOverlay as={GatsbyLink} to={nextPage} rel="next">
                  Next
                </LinkOverlay>
              </Center>
            </LinkBox>
          </HStack>
        )}
      </VStack>
    </Layout>
  )
}

export default BlogPage
