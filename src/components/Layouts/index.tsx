import { Box, CssBaseline } from "@mui/material"
import type { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Box width="100%" height="100%">
      <CssBaseline />
      <Header />
      <Navbar />
      <Box component="main" marginY="auto" px={5} py={2}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
