import { KeyboardArrowLeft } from "@mui/icons-material"
import { Drawer, List, ListItem, ListItemText } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import theme from "styles/theme"
import { companies } from "utils/company"
import { navItems } from "../Navbar"

interface DrawerNavProps {
  open: boolean
  handleClose: () => void
}

const DrawerNav = ({ open, handleClose }: DrawerNavProps) => {
  const [openSubMenu, setOpenSubMenu] = useState(false)

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{ zIndex: theme.zIndex.drawer }}
    >
      <List>
        {openSubMenu && (
          <div
            style={{
              cursor: "pointer",
              padding: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
            onClick={() => setOpenSubMenu(false)}
          >
            <KeyboardArrowLeft />
            <p>Trở lại</p>
          </div>
        )}
        {navItems.map((item) =>
          !openSubMenu ? (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                button
                onClick={
                  item.children ? () => setOpenSubMenu(true) : handleClose
                }
              >
                <ListItemText
                  style={{ textAlign: "center" }}
                  primary={item.icon}
                  secondary={item.name}
                />
              </ListItem>
            </Link>
          ) : (
            <React.Fragment>
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  to={child.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem dense button onClick={handleClose}>
                    {companies.map(
                      (company) =>
                        child.name === company.value && (
                          <ListItemText
                            key={company.value}
                            primary={
                              <img
                                src={company.image || ""}
                                alt={company.label}
                                height={30}
                                width={100}
                                style={{ objectFit: "contain", flexShrink: 0 }}
                              />
                            }
                          />
                        )
                    )}
                  </ListItem>
                </Link>
              ))}
            </React.Fragment>
          )
        )}
      </List>
    </Drawer>
  )
}

export default DrawerNav
