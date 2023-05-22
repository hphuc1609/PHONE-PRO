import { ShoppingCart } from "@mui/icons-material"
import { Badge, Box, Drawer, Typography } from "@mui/material"
import { useState } from "react"
import { useCart } from "react-use-cart"
import DrawerContent from "./DrawerContent"
import { zIndex } from "styles/config"

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  const handleClose = () => {
    setCartOpen(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          sx={{ display: "flex", columnGap: 1, cursor: "pointer" }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCart />
          </Badge>
          <Typography>Giỏ hàng</Typography>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleClose}
        sx={{ zIndex: zIndex }}
      >
        <DrawerContent handleClose={handleClose} />
      </Drawer>
    </>
  )
}

export default Cart
