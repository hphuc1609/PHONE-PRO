import { Box, CssBaseline, useMediaQuery } from "@mui/material"
import { ScrollToTop } from "components/GoToTop"
import React, { useEffect, useState } from "react"
import { mainBackground } from "styles/config"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import Services from "./Liences"
import { useLocation } from "react-router-dom"
import scrollToTop from "helper/scrollToTop"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)
  const [pathName, setPathName] = useState("")
  const mobileScreen = useMediaQuery("(max-width: 576px)")
  const tabletScreen = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    const { pathname } = location
    const paths = [
      "/login",
      "/register",
      "/forgot-password",
      "/profile",
      "/bao-hanh",
      "/lien-he",
      "/ho-so",
      "/gioi-thieu",
    ]

    // Check if pathname is in the paths array
    if (paths.includes(pathname)) return

    setPathName(pathname)
    return () => {
      setPathName("")
    }
  }, [location, setPathName])

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
    <Box
      position={"relative"}
      width="100%"
      minHeight="100vh"
      pb={pathName && (mobileScreen ? 45 : tabletScreen ? 25 : 15)}
    >
      <CssBaseline />
      <Header />
      <Navbar />
      <Box
        component="main"
        pt={{ xs: 10, md: 18 }}
        pb={{ xs: 2, lg: 8 }}
        px={{ xs: 2, lg: 8 }}
        width={{ xl: "1500px" }}
        height="100%"
        margin="auto"
        bgcolor={mainBackground}
      >
        {children}
      </Box>
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {pathName && <Services />}
        <Footer />
      </div>
      {showScrollTop && <ScrollToTop />}
    </Box>
  )
}

export default Layout
