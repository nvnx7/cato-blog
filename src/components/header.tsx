import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  HStack,
  Text,
  Container,
  Heading,
  Divider,
  Link,
} from "@chakra-ui/react"

import CatoLogoSvg from "./CatoLogoSvg"

type HeaderProps = {
  title: string
  author?: string
  date?: string
}

const Header = ({ title, author, date }: HeaderProps) => {
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

export default Header
