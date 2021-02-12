import React from "react"
import { Box, Text, Container, Heading } from "@chakra-ui/react"

import CatoLogoSvg from "./cato-logo"

type BlogHeaderProps = {
  title: string
  author?: string
  date?: string
}

/**
 * /**
 * @param title Title to be displayed in header
 * @param author Author of post, in case header is in context of a blog post
 * @param date Publication date of blog post, in case header is in context of a blog post
 * @returns Component to display as header of blog articles
 *
 * @description This header is specifically for blogs, conforming to good SEO (semantics)
 * practices.
 */
const BlogHeader = ({ title, author, date }: BlogHeaderProps) => {
  return (
    <Box bg="brand.500" w="100%" color="white">
      <Container centerContent py={16} px={0}>
        <CatoLogoSvg />

        <Box as="header">
          <Heading size="lg" align="center" mb={2}>
            {title}
          </Heading>
          {author ? <Text align="center">{author}</Text> : ``}
          {date ? <Text align="center">{date}</Text> : ``}
        </Box>
      </Container>
    </Box>
  )
}

export default BlogHeader
