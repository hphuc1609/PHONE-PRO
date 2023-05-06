import { Close, Delete } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
} from "@mui/material"
import { useCart } from "react-use-cart"
import { borderColor } from "styles/config"

const DrawerContent = () => {
  const {
    isEmpty,
    items,
    cartTotal,
    totalItems,
    updateItemQuantity,
    removeItem,
  } = useCart()

  const convertToPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(items[0]?.price)

  const convertToTotal = Number(cartTotal).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  })

  return (
    <>
      {isEmpty ? (
        <Box
          width={500}
          height="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <img
            src="../assets/Cart-empty.png"
            alt="img..."
            width="100%"
            height={200}
            style={{ objectFit: "contain" }}
          />
          <Typography fontWeight={300} textAlign="center">
            Hiện không có sản phẩm nào trong giỏ hàng!
          </Typography>
        </Box>
      ) : (
        <Box width={500} p={2}>
          <Typography variant="h6" fontWeight={400} gutterBottom>
            Giỏ hàng của tôi ({totalItems})
          </Typography>
          <Divider />
          <Box>
            {items.map((item) => (
              <Grid
                container
                columnSpacing={2}
                key={item.id}
                mt={5}
                sx={{ "&:first-child": { mt: 3 }, "&:last-child": { mb: 3 } }}
              >
                <Grid item xs={3}>
                  <img
                    src={item.photoImage}
                    alt="img..."
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Box display="grid" rowGap={2}>
                    <Typography variant="body1">{item.title}</Typography>
                    <Typography variant="body1">
                      Giá:{" "}
                      <span style={{ fontWeight: 500 }}>{convertToPrice}</span>
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        border={1}
                        borderColor={borderColor}
                        width={100}
                        height={30}
                      >
                        <IconButton
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          sx={{ width: 30, height: "100%" }}
                        >
                          -
                        </IconButton>
                        <Typography variant="body2">{item.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          sx={{ width: 30, height: "100%" }}
                        >
                          +
                        </IconButton>
                      </Box>
                      <IconButton onClick={() => removeItem(item.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Box>
          <Divider />

          <Grid container mt={2}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={500} mb={2}>
                Tổng cộng:{" "}
                <span style={{ color: "#D32F2F" }}>{convertToTotal}</span>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ p: 1 }}
              >
                Thanh toán
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default DrawerContent
