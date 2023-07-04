import { Box, Typography } from "@mui/material"

const EmptyCart = () => {
  return (
    <Box
      width={500}
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <img
        src="../../assets/Cart-empty.png"
        alt="img..."
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
