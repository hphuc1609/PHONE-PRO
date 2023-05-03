import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { INavItem } from "models/navigation"
import { useNavigate } from "react-router-dom"

interface Props {
  item: INavItem
  isActive?: boolean
}

const NavListItem = ({ item, isActive }: Props) => {
  const navigate = useNavigate()

  const handleClickItem = (link: string) => {
    navigate(link)
  }

  return (
    <ListItemButton
      sx={{
        flex: "unset",
        minWidth: 150,
        textAlign: "center",
        bgcolor: isActive ? "#e8e8e8" : "transparent",
      }}
      onClick={() => handleClickItem(item.link)}
    >
      <ListItemIcon sx={{ minWidth: "unset" }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItemButton>
  )
}

export default NavListItem
