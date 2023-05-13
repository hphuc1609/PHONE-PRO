import { Box, CssBaseline } from "@mui/material"
import { ScrollToTop } from "components/ScrollToTop"
import React, { useEffect, useState } from "react"
import { mainBackground } from "styles/config"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Box width="100%" height="100vh" maxHeight="-webkit-fill-available">
      <CssBaseline />

      <Header />
      <Navbar />
      <Box
        component="main"
        p={{ xs: "16px 10px", md: 5 }}
        bgcolor={mainBackground}
        minHeight="100%"
      >
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
      <Footer />

      {showScrollTop && <ScrollToTop />}
    </Box>
  )
}

export default Layout
