import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Heading, Text, Center, Box, Link } from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Center>
        <Box maxW="3xl" py={32} px={4} textAlign="center">
          <Heading color="brand.500">404 Not Found :(</Heading>
          <Text p={8}>
            You just hit a route that doesn&#39;t exist... the sadness...
          </Text>
          Go
          <Link
            as={GatsbyLink}
            to="/"
            fontWeight="bold"
            color="brand.500"
            p={2}
          >
            Home
          </Link>
        </Box>
      </Center>
    </Layout>
  )
}

export default NotFoundPage
