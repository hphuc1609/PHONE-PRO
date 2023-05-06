import { ShoppingCart } from "@mui/icons-material"
import { Badge, Box, Drawer, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import DrawerContent from "./DrawerContent"
import { useCart } from "react-use-cart"

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="cart"
          color="inherit"
          sx={{ padding: 1 }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Typography sx={{ cursor: "default" }}>Giỏ hàng</Typography>
      </Box>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <DrawerContent />
      </Drawer>
    </>
  )
}

export default Cart
