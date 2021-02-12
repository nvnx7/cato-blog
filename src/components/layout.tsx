import React from "react"
import Header from "./header"
import Footer from "./footer"

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
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
