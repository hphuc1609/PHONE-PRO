import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import ShoppingCart from "components/Cart"
import { Link, useNavigate } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { headerHeight, primaryDark } from "styles/config"
import SearchSuggestion from "../Search"
import UserMenu from "./UserMenu"

const Header = ({ user }: WrappedComponentProps) => {
  const navigate = useNavigate()

  const onLogin = () => {
    navigate("/login")
    window.scrollTo(0, 0)
  }
  const onRegister = () => {
    navigate("/register")
    window.scrollTo(0, 0)
  }

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        sx={{
          height: { xs: "4rem", md: headerHeight },
          width: { xs: "100%", xl: 1500 },
          margin: "auto",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          title="Trang chủ Phone Pro"
          onClick={() => window.scrollTo(0, 0)}
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
              src="../../assets/Logo-pro-white.png"
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

        {user ? (
          <Box display={{ xs: "none", md: "flex" }}>
            <UserMenu />
            <ShoppingCart />
          </Box>
        ) : (
          <Box display={{ xs: "none", md: "flex" }} columnGap={1}>
            <Button color="inherit" onClick={onLogin}>
              Đăng nhập
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{ bgcolor: primaryDark, borderRadius: 100 }}
              onClick={onRegister}
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
