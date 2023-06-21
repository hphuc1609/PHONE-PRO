import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { INavItem } from "models/navigation"
import { useNavigate } from "react-router-dom"

interface Props {
  item: INavItem
  isActive: boolean
  openMenu: boolean
  setOpenMenu: (value: boolean) => void
}

const NavListItem = ({ item, isActive, openMenu, setOpenMenu }: Props) => {
  const navigate = useNavigate()

  const handleClickItem = (data: INavItem) => {
    if (data.name === "Sản phẩm") {
      setOpenMenu(!openMenu)
    } else {
      navigate(data.link)
      setOpenMenu(false)
    }
  }

  return (
    <>
      <ListItemButton
        sx={{
          flex: "unset",
          minWidth: 150,
          textAlign: "center",
          bgcolor: isActive ? "#e8e8e8" : "transparent",
        }}
        onClick={() => handleClickItem(item)}
      >
        <ListItemIcon sx={{ minWidth: "unset" }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </>
  )
}

export default NavListItem
