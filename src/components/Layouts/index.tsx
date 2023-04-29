import { Box, CssBaseline } from "@mui/material"
import type { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import { mainBackground } from "styles/config"

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
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
        display="flex"
        flexDirection="column"
      >
        <Box sx={{ flexGrow: 1, marginY: "auto" }}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
