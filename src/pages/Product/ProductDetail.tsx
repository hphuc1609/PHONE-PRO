import {
  AddShoppingCart,
  CachedOutlined,
  CheckCircle,
  Inventory2Outlined,
  Star,
  WorkspacePremium,
} from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import NumberFormat from "components/common/NumberFormat"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { toast } from "react-toastify"
import { useCart } from "react-use-cart"
import { borderColor, primaryDark } from "styles/config"
import ProductInfo from "./ProductInfo"

interface Props {
  data: ICustomAPIResponse[]
}

const Detail = ({ data }: Props) => {
  const { addItem, inCart } = useCart()

  const handleAddToCart = (product: ICustomAPIResponse) => {
    addItem({ ...product, id: product.productId })
    toast.success(`Đã thêm ${product.title} vào giỏ hàng`, toastConfig)
    toast.clearWaitingQueue()
  }

  const getDetailPromo = (item: ICustomAPIResponse) => {
    switch (item.promotion.name) {
      case "Tragop":
        return `Khách hàng có thể mua trả góp sản phẩm lãi suất ${item.promotion.value}% với thời hạn 6 tháng kể từ khi mua hàng.`

      case "Giamgia":
        return `Khách hàng sẽ được giảm ${item.promotion.value}₫ khi tới mua trực tiếp tại cửa hàng.`

      case "Moi":
        return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`

      default:
        return `Cơ hội trúng khi trả góp Home Credit.`
    }
  }

  return (
    <>
      {data.map((item) => (
        <Grid container spacing={3} key={item.productId}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" columnGap={1.5}>
              <Typography component="h1" fontSize={28}>
                Điện thoại {item.title}
              </Typography>
              <Box display="flex" columnGap={0.5}>
                <Box alignItems="center" display="flex">
                  {Array(item.star)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        fontSize="small"
                        sx={{ color: "orange" }}
                      />
                    ))}
                </Box>
                <Typography variant="body1">
                  {item.rateCount} đánh giá
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container item columnSpacing={2}>
              <Grid item xs={4}>
                <img
                  src={item.photoImage}
                  alt="img..."
                  width="100%"
                  style={{ objectFit: "contain" }}
                />
              </Grid>

              <Grid item xs={4}>
                <Grid container item rowGap={1.5}>
                  <Box display="flex" alignItems="center" columnGap={2}>
                    <Typography fontSize={25} color="error" fontWeight={600}>
                      <NumberFormat value={item.price} />
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={500}
                      color="white"
                      p={0.5}
                      bgcolor={
                        (item.promotion.name?.toLowerCase() === "giamgia" &&
                          "#ea1b23") ||
                        (item.promotion.name?.toLowerCase() === "moi" &&
                          "#00a650") ||
                        (item.promotion.name?.toLowerCase() === "tragop" &&
                          "#f7941d")
                      }
                      sx={
                        item.promotion.name === "" && {
                          color: "black",
                          fontSize: 15,
                          textDecoration: "line-through",
                        }
                      }
                    >
                      {(item.promotion.name?.toLowerCase() === "giamgia" &&
                        "Giảm") ||
                        (item.promotion.name?.toLowerCase() === "moi" &&
                          "Mới ra mắt") ||
                        (item.promotion.name?.toLowerCase() === "tragop" &&
                          "Trả góp")}

                      <span style={{ marginLeft: 5 }}>
                        {item.promotion.value}
                      </span>
                      {item.promotion.name === "" &&
                        item.promotion.value !== "" &&
                        "₫"}
                    </Typography>
                  </Box>
                  <Box
                    width="100%"
                    border={1}
                    borderColor={borderColor}
                    px={2}
                    py={1}
                  >
                    <Typography fontWeight={500} gutterBottom>
                      Khuyến mãi
                    </Typography>
                    <Box display="flex" alignItems="center" columnGap={1}>
                      <CheckCircle fontSize="small" color="success" />
                      <Typography variant="body2">
                        {getDetailPromo(item)}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid
                    container
                    item
                    border={1}
                    borderColor={borderColor}
                    px={2}
                    py={1}
                    rowGap={1}
                  >
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center" columnGap={1}>
                        <Inventory2Outlined fontSize="small" color="primary" />
                        <Typography variant="body2">
                          Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                          Lightning - Type C.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center" columnGap={1}>
                        <WorkspacePremium fontSize="small" color="primary" />
                        <Typography variant="body2">
                          Bảo hành chính hãng điện thoại 1 năm tại các trung tâm
                          bảo hành hãng.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center" columnGap={1}>
                        <CachedOutlined fontSize="small" color="primary" />
                        <Typography variant="body2">
                          Hư gì đổi nấy 12 tháng tại 3385 siêu thị toàn quốc
                          (miễn phí tháng đầu).
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        bgcolor: primaryDark,
                      }}
                      fullWidth
                      onClick={() => handleAddToCart(item)}
                      disabled={inCart(item.productId) ? true : false}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        px={2}
                        py={1.5}
                      >
                        {inCart(item.productId) ? (
                          <Typography>Đã thêm vào giỏ</Typography>
                        ) : (
                          <>
                            <Typography
                              textTransform="initial"
                              fontWeight={500}
                              fontSize={17}
                              display="flex"
                              alignItems="center"
                              columnGap={1}
                            >
                              <AddShoppingCart fontSize="small" />
                              Thêm vào giỏ hàng
                            </Typography>
                            <Typography fontSize={12} textTransform="initial">
                              Giao trong 1 giờ hoặc nhận tại cửa hàng
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <ProductInfo item={item.specifications} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default Detail
