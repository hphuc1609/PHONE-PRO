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
              letterSpacing={1}
              fontSize={28}
              fontWeight={500}
            >
              Phone
              <span
                style={{
                  borderTopLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  backgroundColor: "white",
                  padding: "3px 8px",
                  color: primaryDark,
                  letterSpacing: 0,
                  marginLeft: 8,
                  textShadow: `0px 0px 1px ${primaryDark}`,
                }}
              >
                Pro
              </span>
            </Typography>
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
