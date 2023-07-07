import { Build, Call, Home, Info, Menu, Newspaper } from "@mui/icons-material"
import { Box, Grid, List, ListItem, ListItemText } from "@mui/material"
import type { IMenuChildren, INavItem } from "models/navigation"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { headerHeight } from "styles/config"
import theme from "styles/theme"
import NavListItem from "./NavListItem"
import { menuChildren } from "utils/menuChildren"

const navItems: INavItem[] = [
  {
    name: "Trang chủ",
    icon: <Home />,
    link: "/",
  },
  {
    name: "Giới thiệu",
    icon: <Info />,
    link: "/introduce",
  },
  {
    name: "Sản phẩm",
    icon: <Menu />,
    children: menuChildren,
  },
  // {
  //   name: "Tin tức",
  //   icon: <Newspaper />,
  //   link: "/news",
  // },
  {
    name: "Bảo hành",
    icon: <Build />,
    link: "/guarantee",
  },
  {
    name: "Liên hệ",
    icon: <Call />,
    link: "/contact",
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
    <>
      <Box
        component="nav"
        gridArea="nav"
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        bgcolor="white"
        boxShadow="0 2px 10px 0 rgba(0,0,0,0.15)"
        position="relative"
        pt={headerHeight}
      >
        <List
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            p: 0,
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
        </List>
      </Box>

      {openMenu && (
        <List
          sx={{
            position: "absolute",
            zIndex: 99,
            top: `calc(${headerHeight} + 3.1rem)`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
            bgcolor: "white",
            boxShadow: "0 2px 10px 0 rgba(0,0,0,0.15)",
            p: 0,
          }}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <Grid container display="flex" justifyContent="center">
            {navItems.map((item) =>
              item.children?.map((child) => (
                <Grid item xs={0} key={child.name}>
                  <ListItemText
                    primary={child.name}
                    sx={{
                      flex: "unset",
                      minWidth: 100,
                      textAlign: "center",
                      color:
                        checkActiveNavLink(child.link) &&
                        theme.palette.primary.main,
                      position: "relative",
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
    </>
  )
}

export default Navbar
