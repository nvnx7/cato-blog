import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, Flex, HStack, Text, Divider, Link } from "@chakra-ui/react"

/**
 * @description Common header to display page navigation links etc.
 */
const Header = () => {
  return (
    <Box bg="brand.500" w="100%" color="white">
      <Flex direction="row" justify="space-between" p={4}>
        <Link as={GatsbyLink} to="/" _hover={{ textDecoration: "none" }}>
          <Text as="strong" fontSize="lg">
            cato
          </Text>
          <Text as="strong" fontSize="lg" color="brand.900" ml={1}>
            blog
          </Text>
        </Link>

        <HStack as="nav" spacing={8}>
          <Link as={GatsbyLink} to="/">
            Home
          </Link>

          <Link as={GatsbyLink} to="/authors">
            Authors
          </Link>

          <Link as={GatsbyLink} to="/archive">
            Archive
          </Link>

          <Divider orientation="vertical" />

          <Link href="https://cato.tv" color="brand.900" isExternal>
            Cato.tv
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header
