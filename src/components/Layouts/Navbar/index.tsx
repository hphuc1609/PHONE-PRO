import {
  Build,
  Home,
  Info,
  Newspaper,
  Phone,
  PhoneAndroid,
} from "@mui/icons-material"
import { Box, Grid, List, ListItemText } from "@mui/material"
import type { INavItem } from "models/navigation"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { headerHeight } from "styles/config"
import theme from "styles/theme"
import { menuChildren } from "utils/menuChildren"
import NavListItem from "./NavListItem"

export const navItems: INavItem[] = [
  {
    name: "Trang chủ",
    icon: <Home />,
    link: "/",
  },
  {
    name: "Giới thiệu",
    icon: <Info />,
    link: "/gioi-thieu",
  },
  {
    name: "Điện thoại",
    icon: <PhoneAndroid />,
    children: menuChildren,
  },
  {
    name: "Tin tức",
    icon: <Newspaper />,
    link: "/tin-tuc",
  },
  {
    name: "Bảo hành",
    icon: <Build />,
    link: "/bao-hanh",
  },
  {
    name: "Liên hệ",
    icon: <Phone />,
    link: "/lien-he",
  },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(false)

  const checkActiveNavLink = (link: string) => link === location.pathname

  const handleClickProduct = (link: string) => {
    navigate(link)
    setOpenMenu(false)
  }
  return (
    <Box
      component="nav"
      gridArea="nav"
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
      bgcolor="white"
      boxShadow="0 2px 10px 0 rgba(0,0,0,0.1)"
      position="fixed"
      top={0}
      width="100%"
      zIndex={99}
      mt={headerHeight}
    >
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          position: "relative",
        }}
      >
        {navItems.map((item) => (
          <NavListItem
            key={item.name}
            item={item}
            isActive={checkActiveNavLink(item.link)}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        ))}
        {/* Sub menu */}
        {openMenu && (
          <List
            sx={{
              position: "absolute",
              zIndex: 99,
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              bgcolor: "white",
              boxShadow: "0 2px 10px 0 rgba(0,0,0,0.1)",
              p: 0,
            }}
          >
            <Grid
              container
              display="flex"
              alignItems="center"
              columnGap={3}
              px={2}
            >
              {navItems.map((item) =>
                item.children?.map((child) => (
                  <Grid item xs={0} key={child.name}>
                    <ListItemText
                      primaryTypographyProps={{ textTransform: "capitalize" }}
                      primary={child.name}
                      sx={{
                        minWidth: 50,
                        textAlign: "center",
                        color:
                          checkActiveNavLink(child.link) &&
                          theme.palette.primary.main,
                        cursor: "pointer",
                        padding: "0.5rem 0",
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                      onClick={() => handleClickProduct(child.link)}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </List>
        )}
      </List>
    </Box>
  )
}

export default Navbar
