import { AccountCircle, Logout, Person } from "@mui/icons-material"
import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material"
import ListItemIcon from "@mui/material/ListItemIcon"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { WrappedComponentProps } from "react-with-firebase-auth"

const UserMenu = ({ signOut, user }: WrappedComponentProps) => {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  return (
    <Box display="flex" alignItems="center" mr={2}>
      <Box
        sx={{ display: "flex", columnGap: 1, cursor: "pointer" }}
        onClick={handleOpenMenu}
      >
        <AccountCircle />
        <Typography>Tài khoản</Typography>
      </Box>

      <Menu
        id="account-menu"
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        autoFocus={false}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography color="primary" sx={{ p: "5px 16px" }}>
          {user?.email}
        </Typography>
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseMenu(), navigate("/user")
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <Typography>Người dùng</Typography>
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography>Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default createComponentWithAuth(UserMenu)
