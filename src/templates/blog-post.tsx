import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import {
  Heading,
  Text,
  Center,
  Box,
  HStack,
  Flex,
  LinkOverlay,
  LinkBox,
  Icon,
} from "@chakra-ui/react"

import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight"
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft"

type BlogPostProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    markdownRemark: {
      id: string
      excerpt: string
      html: string
      frontmatter: {
        date: string
        title: string
        description: string
      }
    }
    previous: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    next: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }
}

export const query = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data }: BlogPostProps) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Center>
        <Box py={8} px={4} maxW="3xl">
          <Box as="article" itemType="http://schema.org/Article">
            <Box as="header" mt={4} mb={8}>
              <Heading>{post.frontmatter.title}</Heading>
              <HStack spacing={24} mt={2}>
                <Text fontSize="sm" textTransform="uppercase">
                  {post.frontmatter.date}
                </Text>
                <Text fontSize="sm" textTransform="uppercase" fontWeight="bold">
                  {/*post.frontmatter.author*/ "John Doe"}
                </Text>
              </HStack>
            </Box>

            <Box
              as="section"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></Box>
          </Box>

          <Flex
            as="nav"
            justify="space-between"
            alignItems="center"
            wrap="wrap"
            my={8}
          >
            <Center
              _hover={{ color: "brand.500" }}
              w="xs"
              align="center"
              mt={4}
            >
              {previous && (
                <LinkBox boxShadow="xl" p="6" rounded="md" bg="white" w="100%">
                  <Text fontSize="sm" color="gray.400">
                    Previous
                  </Text>
                  <Icon as={FaAngleLeft} w={6} h={6} />
                  <LinkOverlay as={GatsbyLink} to={previous.fields.slug}>
                    {previous.frontmatter.title}
                  </LinkOverlay>
                </LinkBox>
              )}
            </Center>

            <Center
              _hover={{ color: "brand.500" }}
              w="xs"
              align="center"
              mt={4}
            >
              {next && (
                <LinkBox boxShadow="xl" p="6" rounded="md" bg="white" w="100%">
                  <Text fontSize="sm" color="gray.400">
                    Next
                  </Text>
                  <LinkOverlay as={GatsbyLink} to={next.fields.slug}>
                    {next.frontmatter.title}
                  </LinkOverlay>
                  <Icon as={FaAngleRight} w={6} h={6} />
                </LinkBox>
              )}
            </Center>
          </Flex>
        </Box>
      </Center>
    </Layout>
  )
}

export default BlogPostTemplate
