import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import {
  Text,
  Center,
  Box,
  Flex,
  LinkOverlay,
  LinkBox,
  Icon,
} from "@chakra-ui/react"

import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight"
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft"

import BlogHeader from "../components/blog-header"

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
        title: string
        author: string
        description: string
        date: string
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
        author
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

/**
 * @param data Data from graphql query
 * @returns Component to display a blog
 *
 */
const BlogPostTemplate = ({ data }: BlogPostProps) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Box w="100%">
        <Box as="article" itemType="http://schema.org/Article">
          <BlogHeader
            title={post.frontmatter.title}
            author={post.frontmatter.author}
            date={post.frontmatter.date}
          />

          <Center as="section" py={8} px={4}>
            <Box
              maxW="3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></Box>
          </Center>
        </Box>

        <Center my={8}>
          <Flex as="nav" justify="space-between" wrap="wrap" w="3xl">
            <Center
              w="xs"
              align="center"
              mt={4}
              _hover={{ color: "brand.500" }}
            >
              {previous && (
                <LinkBox boxShadow="xl" p="6" rounded="md" bg="white" w="100%">
                  <Text fontSize="sm" color="gray.400">
                    Previous
                  </Text>
                  <Icon as={FaAngleLeft} w={6} h={6} />
                  <LinkOverlay
                    as={GatsbyLink}
                    to={previous.fields.slug}
                    color="brand.900"
                    _hover={{ color: "brand.500" }}
                  >
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
                  <LinkOverlay
                    as={GatsbyLink}
                    to={next.fields.slug}
                    color="brand.900"
                    _hover={{ color: "brand.500" }}
                  >
                    {next.frontmatter.title}
                  </LinkOverlay>
                  <Icon as={FaAngleRight} w={6} h={6} />
                </LinkBox>
              )}
            </Center>
          </Flex>
        </Center>
      </Box>
    </Layout>
  )
}

export default BlogPostTemplate
