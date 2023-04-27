import { Build, Call, Home, Info, Newspaper } from "@mui/icons-material"
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import type { INavItem } from "models/navigation"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()

  const handleClickItem = (link: string) => {
    navigate(link)
  }

  return (
    <Box
      position="sticky"
      gridArea="nav"
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
      bgcolor="white"
      top={0}
      boxShadow="0 2px 10px 0 rgba(0,0,0,0.15)"
      zIndex={999}
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
          <ListItemButton
            key={item.name}
            sx={{ flex: "unset", minWidth: 150, textAlign: "center" }}
            onClick={() => handleClickItem(item.link)}
          >
            <ListItemIcon sx={{ minWidth: "unset" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default Navbar
