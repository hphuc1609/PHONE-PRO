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
      "/tin-tuc",
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
    <Box position={"relative"} width="100%" height="100vh">
      <CssBaseline />
      <Header />
      <Navbar />
      <Box
        component="main"
        pt={{ xs: 10, md: 20 }}
        pb={{ xs: 4 }}
        px={{ xs: 3, lg: 8 }}
        width="100%"
        minHeight="100%"
        margin="auto"
        bgcolor={mainBackground}
      >
        {children}
      </Box>
      {pathName && <Services />}
      <Footer />
      {showScrollTop && <ScrollToTop />}
    </Box>
  )
}

export default Layout
