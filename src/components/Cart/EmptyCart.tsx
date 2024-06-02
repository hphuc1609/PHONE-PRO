import { Close } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface EmptyCartProps {
  handleClose: () => void
}

const EmptyCart = ({ handleClose }: EmptyCartProps) => {
  return (
    <Box
      width={{ xs: "100%", md: 500 }}
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      px={2}
      position="relative"
    >
      <IconButton
        size="small"
        onClick={handleClose}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        <Close />
      </IconButton>
      <img
        src="../../assets/Cart-empty.png"
        alt="Cart-empty"
        width="100%"
        height={200}
        style={{ objectFit: "contain" }}
      />
      <Typography fontWeight={300} textAlign="center">
        Hiện không có sản phẩm nào trong giỏ hàng!
      </Typography>
    </Box>
  )
}

export default EmptyCart
