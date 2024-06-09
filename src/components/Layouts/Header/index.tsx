import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import ShoppingCart from "components/Cart"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { headerHeight, primaryDark } from "styles/config"
import SearchSuggestion from "../Search"
import UserMenu from "./UserMenu"
import { AccountCircle } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import DrawerNav from "./DrawerNav"
import { useState } from "react"

const Header = ({ user }: WrappedComponentProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openAccount, setOpenAccount] = useState<null | HTMLElement>(null)

  const handleOpenAccount = (event: React.MouseEvent<HTMLElement>) => {
    setOpenAccount(event.currentTarget)
  }
  const handleClose = () => {
    setOpenAccount(null)
  }

  const onLogin = () => {
    navigate("/login")
    setOpenAccount(null)
  }
  const onRegister = () => {
    navigate("/register")
    setOpenAccount(null)
  }

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        sx={{
          minHeight: { xs: "4rem", md: headerHeight },
          maxHeight: { xs: "4rem", md: headerHeight },
          justifyContent: "space-between",
        }}
      >
        <Box
          alignItems="center"
          display="flex"
          sx={{ display: { xs: "none", md: "inline-flex" } }}
        >
          <Link
            to="/"
            title="Trang chủ Phone Pro"
            style={{ textDecoration: "none", color: "inherit" }}
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
          </Link>
        </Box>
        {/* Hamburger */}
        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" }, color: "inherit" }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <DrawerNav open={openDrawer} handleClose={() => setOpenDrawer(false)} />
        {/* Search bar */}
        <SearchSuggestion />

        {user ? (
          <Box display={"flex"}>
            <UserMenu />
            <ShoppingCart />
          </Box>
        ) : (
          <>
            {/* Mobile */}
            <Box display="flex" alignItems="center" mr={2}>
              <Box
                sx={{ display: "flex", columnGap: 1, cursor: "pointer" }}
                onClick={handleOpenAccount}
              >
                <AccountCircle />
              </Box>
              <Menu
                id="account-menu"
                open={Boolean(openAccount)}
                anchorEl={openAccount}
                onClose={handleClose}
                autoFocus={false}
                keepMounted
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={onLogin}>
                  <Typography>Đăng nhập</Typography>
                </MenuItem>
                <MenuItem onClick={onRegister}>
                  <Typography>Đăng ký</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Large screen */}
            <Box display={{ xs: "none", sm: "flex" }} columnGap={1}>
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
                sx={{
                  backgroundColor: pathname === "/register" && primaryDark,
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default createComponentWithAuth(Header)
