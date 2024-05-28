import { Box, CssBaseline } from "@mui/material"
import { ScrollToTop } from "components/GoToTop"
import React, { useEffect, useState } from "react"
import { mainBackground } from "styles/config"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import Services from "./Liences"
import { useLocation } from "react-router-dom"
import scrollToTop from "helper/scrollToTop"
interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const location = useLocation()

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)
  const [pathName, setPathName] = useState("")

  useEffect(() => {
    if (location.pathname === "/") {
      setPathName(location.pathname)
    }

    if (location.pathname === "/profile") {
      setPathName(location.pathname)
    }

    return () => {
      setPathName("")
    }
  }, [location])

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

  useEffect(() => {
    scrollToTop()
  }, [location])

  return (
    <Box position={"relative"} width="100%" minHeight="100vh">
      <CssBaseline />
      <Header />
      <Navbar />
      <Box
        component="main"
        pt={{ xs: 2, md: 18 }}
        pb={{ xs: 2, md: 8 }}
        px={{ xs: 1, md: 8 }}
        width={{ xl: "1500px" }}
        minHeight={"100vh"}
        margin="auto"
        bgcolor={mainBackground}
      >
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
      {pathName && <Services />}
      {showScrollTop && <ScrollToTop />}
      <Footer />
    </Box>
  )
}

export default Layout
