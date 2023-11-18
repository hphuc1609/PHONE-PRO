import { Delete } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import NumberFormat from "components/common/NumberFormat"
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart"
import { borderColor } from "styles/config"
import EmptyCart from "./EmptyCart"
import scrollToTop from "helper/scrollToTop"

const useStyles = makeStyles(() => ({
  content: {
    height: 400,
    overflowY: "scroll",
    padding: 10,
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#eee",
    },
  },
  borderBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: 1,
    borderColor: borderColor,
    width: 100,
    height: 30,
  },
}))

interface Props {
  handleClose: () => void
}

const DrawerContent = ({ handleClose }: Props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const {
    isEmpty,
    items,
    cartTotal,
    totalItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart()

  const handleOrderClick = () => {
    navigate("/payment")
    handleClose()
    scrollToTop()
  }

  return (
    <>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <Box width={500} p={2} overflow="hidden">
          <Typography variant="h6" fontWeight={400} gutterBottom>
            Giỏ hàng của tôi ({totalItems})
          </Typography>
          <Divider />
          <Box className={classes.content}>
            {items.map((item) => (
              <Box
                key={item.id}
                border={`1px solid ${borderColor}`}
                my={3}
                py={2}
                px={1}
              >
                <Grid container columnSpacing={2}>
                  <Grid item xs={3}>
                    <img
                      src={item.photoImage}
                      alt="img..."
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="grid" rowGap={2}>
                      <Typography fontWeight={500}>{item.title}</Typography>
                      <Box display="flex" columnGap={1}>
                        <Typography>Giá:</Typography>
                        <NumberFormat value={item.price} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box className={classes.borderBox}>
                          <IconButton
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                            sx={{ width: 30, height: "100%" }}
                          >
                            -
                          </IconButton>
                          <Typography variant="body2">
                            {item.quantity}
                          </Typography>
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
              </Box>
            ))}
          </Box>
          <Divider />

          <Grid container mt={2} spacing={1}>
            <Grid item xs={12}>
              <Box display="flex" columnGap={1} alignItems="baseline">
                <Typography variant="body1" fontWeight={500}>
                  Tổng cộng:
                </Typography>
                <NumberFormat
                  value={cartTotal}
                  locale="it-IT"
                  color="error"
                  TextProps={{
                    fontWeight: 500,
                    fontSize: 18,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                sx={{ gap: 0.5, padding: 1, alignItems: "flex-start" }}
                onClick={handleOrderClick}
                disableElevation
                fullWidth
              >
                Đặt hàng
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  gap: 0.5,
                  padding: 1,
                  alignItems: "flex-start",
                }}
                onClick={emptyCart}
                disableElevation
                fullWidth
              >
                Xoá tất cả
                <Delete fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default DrawerContent
