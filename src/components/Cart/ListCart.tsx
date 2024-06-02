import { Close, Delete } from "@mui/icons-material"
import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import NumberFormat from "components/common/NumberFormat"
import { useNavigate } from "react-router-dom"
import { useCart } from "react-use-cart"
import { borderColor } from "styles/config"
import EmptyCart from "./EmptyCart"

const useStyles = makeStyles(() => ({
  listCart: {
    height: 400,
    overflowY: "scroll",
    borderTop: `1px solid ${borderColor}`,
    borderRight: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#efefef",
      borderRadius: 0,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
  boxQuantity: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid",
    borderColor: borderColor,
    width: 100,
    height: 30,
  },
}))

interface ListCartProps {
  handleClose: () => void
}

const ListCart = ({ handleClose }: ListCartProps) => {
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
  }

  return (
    <>
      {isEmpty ? (
        <EmptyCart handleClose={handleClose} />
      ) : (
        <Box width={{ xs: "100%", md: 500 }} p={2} overflow="hidden">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Typography variant="h6" fontWeight={400}>
              Giỏ hàng của tôi ({totalItems})
            </Typography>
            <IconButton size="small" onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Box className={classes.listCart}>
            {items.map((item) => (
              <Box
                key={item.id}
                borderBottom={`1px solid ${borderColor}`}
                borderLeft={`1px solid ${borderColor}`}
                py={2}
                px={1}
              >
                <Grid container columnSpacing={2}>
                  <Grid item xs={3}>
                    <img
                      src={item.photoImage}
                      alt="IMG..."
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="grid" rowGap={2}>
                      <Typography fontWeight={500}>{item.title}</Typography>
                      <Box display="flex" columnGap={1}>
                        <Typography fontWeight={500} color={"primary"}>
                          Giá:
                        </Typography>
                        <NumberFormat value={item.price} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box className={classes.boxQuantity}>
                          <IconButton
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                            sx={{
                              width: 30,
                              height: "100%",
                              borderRight: `1px solid ${borderColor}`,
                              borderRadius: 0,
                            }}
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
                            sx={{
                              width: 30,
                              height: "100%",
                              borderLeft: `1px solid ${borderColor}`,
                              borderRadius: 0,
                            }}
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
          {/* Total */}
          <Grid container mt={2} spacing={1}>
            <Grid item xs={12}>
              <Box display="flex" columnGap={1} alignItems="baseline" mb={1}>
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

export default ListCart
