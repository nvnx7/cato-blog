import React from "react"
import { Link } from "gatsby"
import Header from "./header"
import Footer from "./footer"

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = ({ children } : LayoutProps) => {

  return (
    <div className="global-wrapper" data-is-root-path={true}>
      <header className="global-header"><Header /></header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
