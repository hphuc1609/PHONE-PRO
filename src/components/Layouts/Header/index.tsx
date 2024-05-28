import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import ShoppingCart from "components/Cart"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { headerHeight, primaryDark } from "styles/config"
import SearchSuggestion from "../Search"
import UserMenu from "./UserMenu"

const Header = ({ user }: WrappedComponentProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onLogin = () => {
    navigate("/login")
  }
  const onRegister = () => {
    navigate("/register")
  }

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        sx={{
          minHeight: { xs: "4rem", md: headerHeight },
          maxHeight: { xs: "4rem", md: headerHeight },
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Link
          to="/"
          title="Trang chủ Phone Pro"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            alignItems="center"
            display="flex"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            <Typography
              variant="body1"
              textTransform="uppercase"
              letterSpacing={2}
              fontSize={30}
              fontWeight={500}
            >
              Phone
            </Typography>
            <img
              src="/assets/Logo-pro-white.png"
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

        {/* Search bar */}
        <SearchSuggestion />

        {user ? (
          <Box display={{ xs: "none", md: "flex" }}>
            <UserMenu />
            <ShoppingCart />
          </Box>
        ) : (
          <Box display={{ xs: "none", md: "flex" }} columnGap={1}>
            <Button
              color="inherit"
              variant="text"
              onClick={onLogin}
              sx={{ backgroundColor: pathname === "/login" && primaryDark }}
            >
              Đăng nhập
            </Button>
            <Button
              color="inherit"
              variant="text"
              onClick={onRegister}
              sx={{ backgroundColor: pathname === "/register" && primaryDark }}
            >
              Đăng ký
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default createComponentWithAuth(Header)
