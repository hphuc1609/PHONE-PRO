import {
  AddShoppingCart,
  CachedOutlined,
  CheckCircle,
  Inventory2Outlined,
  Star,
  WorkspacePremium,
} from "@mui/icons-material"
import { Box, Button, Grid, Icon, Typography } from "@mui/material"
import AlertDialog from "components/common/Dialog"
import NumberFormat from "components/common/NumberFormat"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useCart } from "react-use-cart"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { borderColor, primaryDark } from "styles/config"
import ProductInfo from "./ProductInfo"
import { createComponentWithAuth } from "Firebase/firebaseConfig"

interface Props {
  data: ICustomAPIResponse[]
  user?: WrappedComponentProps["user"]
}

const Detail = ({ data, user }: Props) => {
  const navigate = useNavigate()
  const { addItem, inCart } = useCart()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddToCart = (product: ICustomAPIResponse) => {
    if (user) {
      addItem({ ...product, id: product.productId })
      toast.success(`Đã thêm ${product.title} vào giỏ hàng`, toastConfig)
      toast.clearWaitingQueue()
    } else {
      setOpen(true)
    }
  }

  const renderTextPromotion = (item: ICustomAPIResponse) => {
    switch (item.promotion.name) {
      case "tragop":
        return `Khách hàng có thể mua trả góp sản phẩm lãi suất 0% với thời hạn 6 tháng kể từ khi mua hàng.`
      case "giamgia":
        return `Khách hàng sẽ được giảm ${item.promotion.value} khi tới mua trực tiếp tại cửa hàng.`
      case "moiramat":
        return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`
      default:
        return `Cơ hội trúng giải thưởng khi trả góp Home Credit.`
    }
  }

  const renderSubText = [
    {
      text: "Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C.",
      icon: <Inventory2Outlined />,
    },
    {
      text: "Bảo hành chính hãng điện thoại 1 năm tại các trung tâm bảo hành hãng.",
      icon: <WorkspacePremium />,
    },
    {
      text: "Hư gì đổi nấy 12 tháng tại 3385 cửa hàng điện thoại trên toàn quốc (miễn phí tháng đầu).",
      icon: <CachedOutlined />,
    },
  ]

  const renderBgColor = (item: ICustomAPIResponse) => {
    return (
      (item.promotion.name?.toLowerCase() === "giare" && "#1A73E8") ||
      (item.promotion.name?.toLowerCase() === "giamgia" && "#ea1b23") ||
      (item.promotion.name?.toLowerCase() === "moiramat" && "#00a650") ||
      (item.promotion.name?.toLowerCase() === "tragop" && "#f7941d")
    )
  }

  const renderLabel = (item: ICustomAPIResponse) => {
    switch (item.promotion.name?.toLowerCase()) {
      case "giare":
        return "Giá rẻ online"
      case "giamgia":
        return "Giảm"
      case "moiramat":
        return "Mới ra mắt"
      case "tragop":
        return "Trả góp"
      default:
        return ""
    }
  }

  const renderDiscount = (item: ICustomAPIResponse) => {
    switch (item.promotion.name?.toLowerCase()) {
      case "tragop":
        return <span style={{ marginLeft: 5 }}>{item.promotion.value}%</span>
      case "giamgia":
        return <span style={{ marginLeft: 5 }}>{item.promotion.value}</span>
      default:
        return ""
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
                <Box alignItems="flex-start" display="flex">
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

              {/* Price */}
              <Grid item xs={4}>
                <Grid container item rowGap={1.5}>
                  <Box display="flex" alignItems="center" columnGap={2}>
                    {item.promotion.name !== "giare" ? (
                      <React.Fragment>
                        <NumberFormat
                          value={item.price}
                          color="#ea1b23"
                          TextProps={{
                            fontSize: 25,
                            fontWeight: "bold",
                          }}
                        />
                        <Typography
                          fontSize={12}
                          fontWeight={500}
                          color="white"
                          p={0.5}
                          bgcolor={renderBgColor(item)}
                        >
                          {renderLabel(item)}
                          {renderDiscount(item)}
                        </Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {item.promotion.value !== "" ? (
                          <React.Fragment>
                            <Typography
                              fontSize={25}
                              fontWeight="bold"
                              color="#ea1b23"
                            >
                              {item.promotion.value + "₫"}
                            </Typography>
                            <NumberFormat
                              value={item.price}
                              TextProps={{
                                sx: { textDecoration: "line-through" },
                              }}
                            />
                          </React.Fragment>
                        ) : (
                          <NumberFormat
                            value={item.price}
                            color="#ea1b23"
                            TextProps={{ fontSize: 25, fontWeight: "bold" }}
                          />
                        )}
                        <Typography
                          fontSize={12}
                          fontWeight={500}
                          color="white"
                          p={0.5}
                          bgcolor={renderBgColor(item)}
                        >
                          {renderLabel(item)}
                        </Typography>
                      </React.Fragment>
                    )}
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
                        {renderTextPromotion(item)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Thông tin bảo hành */}
                  <Grid
                    container
                    item
                    border={1}
                    borderColor={borderColor}
                    px={2}
                    py={1}
                    rowGap={1}
                  >
                    {renderSubText.map((item) => (
                      <Grid key={item.text} item xs={12}>
                        <Box display="flex" alignItems="center" columnGap={1}>
                          <Icon color="primary">{item.icon}</Icon>
                          <Typography variant="body2">{item.text}</Typography>
                        </Box>
                      </Grid>
                    ))}
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

      <AlertDialog
        open={open}
        handleClose={handleClose}
        content="Bạn cần đăng nhập để mua hàng"
        leftButton="Đóng"
        onClickLeftButton={handleClose}
        rightButton="Đăng nhập"
        onClickRightButton={() => navigate("/login")}
        fullWidthButton
      />
    </>
  )
}

export default createComponentWithAuth(Detail)
