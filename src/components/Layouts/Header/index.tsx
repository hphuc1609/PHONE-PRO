import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { appBarHeight } from "styles/config"
import SearchSuggestion from "../Search"
import UserMenu from "./UserMenu"

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          height: { xs: "4rem", md: appBarHeight },
          margin: { xs: "0 auto", md: "0" },
          justifyContent: "space-between",
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
              src="../assets/Logo-pro-white.png"
              alt="Logo"
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
        <SearchSuggestion />

        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
