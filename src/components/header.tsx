import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  HStack,
  Text,
  Divider,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  DrawerFooter,
  Icon,
  Center,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { FaBars } from "@react-icons/all-files/fa/FaBars"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"

const query = graphql`
  query footerQuery {
    site {
      siteMetadata {
        social {
          twitter
          instagram
          linkedin
        }
        privacyPolicy
      }
    }
  }
`

/**
 * @description Common header to display page navigation links etc.
 */
const Header = () => {
  const data = useStaticQuery(query)
  const { isOpen, onOpen, onClose } = useDisclosure()

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

        <HStack display={{ base: "none", md: "flex" }} as="nav" spacing={8}>
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

        <Box display={{ base: "initial", md: "none" }}>
          <IconButton
            icon={<FaBars />}
            aria-label="Navigation"
            colorScheme="brand"
            size="lg"
            onClick={onOpen}
          />

          <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent color="white" bg="brand.900">
              <DrawerCloseButton />
              <DrawerHeader>
                <Text as="strong" fontSize="lg" color="brand.500">
                  cato
                </Text>
                <Text as="strong" fontSize="lg" ml={1}>
                  blog
                </Text>
              </DrawerHeader>

              <DrawerBody>
                <VStack as="nav" spacing={4} py={8}>
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

                  <Link href="https://cato.tv" color="brand.500" isExternal>
                    Cato.tv
                  </Link>
                </VStack>
              </DrawerBody>

              <DrawerFooter>
                <Flex direction="column" justify="space-between" align="center">
                  <HStack spacing={8} p={4}>
                    <Link
                      href={data.site.siteMetadata?.social?.twitter}
                      isExternal
                      sx={{
                        "&:hover": {
                          color: "brand.500",
                        },
                      }}
                    >
                      <Icon as={FaTwitter} w={6} h={6} />
                    </Link>

                    <Link
                      href={data.site.siteMetadata?.social?.instagram}
                      isExternal
                      sx={{
                        "&:hover": {
                          color: "brand.500",
                        },
                      }}
                    >
                      <Icon as={FaInstagram} w={6} h={6} />
                    </Link>

                    <Link
                      href={data.site.siteMetadata?.social?.linkedin}
                      isExternal
                      sx={{
                        "&:hover": {
                          color: "brand.500",
                        },
                      }}
                    >
                      <Icon as={FaLinkedin} w={6} h={6} />
                    </Link>
                  </HStack>

                  <Center p={4}>
                    <Text m={0} pr={2}>
                      © 2020
                    </Text>
                    <Link
                      href={data.site.siteMetadata?.privacyPolicy}
                      isExternal
                    >
                      Privacy Policy
                    </Link>
                  </Center>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </Box>
  )
}

export default Header
