import React from "react"
import Header from "./header"
import Footer from "./footer"
import { Box } from "@chakra-ui/react"

type LayoutProps = {
  children: React.ReactNode
}

/**
 * @param children Main content of layout
 * @returns Component that wraps around content
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Box as="main" minH="83vh">
        {children}
      </Box>
      <Footer />
    </div>
  )
}

export default Layout
