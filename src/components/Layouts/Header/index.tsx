import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
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
          height: appBarHeight,
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
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight={400}
            letterSpacing={2}
            display="flex"
            alignItems="center"
          >
            SmartPhone
            <img
              src="../assets/logo-pro-white.png"
              alt=""
              height={40}
              width={80}
              style={{
                borderTopLeftRadius: 3,
                borderBottomRightRadius: 3,
                marginLeft: 5,
              }}
            />
          </Typography>
        </Link>
        <SearchSuggest setSearchQuery={setSearchQuery} />

        <Box mr={2}>
          <UserMenu />
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            size="large"
            aria-label="cart of current user"
            aria-controls="cart-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{ padding: 1 }}
          >
            <ShoppingCart />
          </IconButton>
          <Typography sx={{ cursor: "default" }}>Giỏ hàng</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
