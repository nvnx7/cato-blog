import React from "react"
import Header from "./header"
import Footer from "./footer"

/**
 * @param children Main content of layout
 */
type LayoutProps = {
  children: React.ReactNode
}

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
