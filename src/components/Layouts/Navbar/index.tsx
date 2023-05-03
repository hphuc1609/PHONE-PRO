import { Build, Call, Home, Info, Newspaper } from "@mui/icons-material"
import { Box, List } from "@mui/material"
import type { INavItem } from "models/navigation"
import { useLocation } from "react-router-dom"
import NavListItem from "./NavListItem"

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
    name: "Tin tức",
    icon: <Newspaper />,
    link: "/news",
  },
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
  const location = useLocation()

  const checkActiveNavLink = (link: string) => link === location.pathname

  return (
    <Box
      component="nav"
      gridArea="nav"
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
      bgcolor="white"
      boxShadow="0 2px 10px 0 rgba(0,0,0,0.15)"
      zIndex={999}
      position="sticky"
      top={0}
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
          />
        ))}
      </List>
    </Box>
  )
}

export default Navbar
