import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { appBarHeight } from "styles/config"
import SearchSuggest from "../Search"
import UserMenu from "./UserMenu"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          height: { xs: "4rem", md: appBarHeight },
          margin: { xs: "0 auto", md: "0" },
        }}
      >
        <Link
          to="/"
          title="Trang chủ Smartphone"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box alignItems="center" display="flex">
            <Typography
              variant="body1"
              textTransform="uppercase"
              fontWeight={300}
              letterSpacing={2}
              fontSize={30}
            >
              Phone
            </Typography>
            <img
              src="../assets/logo-pro-white.png"
              alt=""
              height={40}
              width={80}
              style={{
                borderTopLeftRadius: 5,
                borderBottomRightRadius: 5,
                marginLeft: 5,
              }}
            />
          </Box>
        </Link>
        <Box display={{ xs: "none", md: "flex" }} flexGrow={1}>
          <SearchSuggest setSearchQuery={setSearchQuery} />
        </Box>

        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
