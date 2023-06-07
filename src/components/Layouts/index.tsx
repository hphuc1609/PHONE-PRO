import { Box, CssBaseline } from "@mui/material"
import { ScrollToTop } from "components/ScrollToTop"
import React, { useEffect, useState } from "react"
import { mainBackground } from "styles/config"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import SupportServices from "./SupportServices"
import { useLocation } from "react-router-dom"
interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const location = useLocation()

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)
  const pathName = location.pathname.toString().split("/")[1]

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
        width={{ xl: "1500px" }}
        margin="auto"
        bgcolor={mainBackground}
      >
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>

      {!pathName && <SupportServices />}
      <Footer />

      {showScrollTop && <ScrollToTop />}
    </Box>
  )
}

export default Layout
