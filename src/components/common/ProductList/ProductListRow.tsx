import StarIcon from "@mui/icons-material/Star"
import { Box, Button, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { createComponentWithAuth } from "Firebase/firebaseConfig"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useCart } from "react-use-cart"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { borderColor } from "styles/config"
import AlertDialog from "../Dialog"
import NumberFormat from "../NumberFormat"

const useStyles = makeStyles(() => ({
  text: {
    position: "absolute",
    bottom: 0,
    left: "auto",
    padding: "3px 8px",
    color: "white",
    fontWeight: 600,
    fontSize: 12,
    textAlign: "center",
    borderRadius: 3,
  },
  lineClampText: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
}))

interface Props {
  data: ICustomAPIResponse
  user?: WrappedComponentProps["user"]
}

const ProductListRow = ({ data, user }: Props) => {
  const classes = useStyles()
  const { addItem, inCart } = useCart()
  const navigate = useNavigate()

  const [isHovered, setIsHovered] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleAddToCart = () => {
    if (user) {
      const newData = { ...data, id: data.productId }
      addItem(newData)
      toast.success(`Đã thêm ${data.title} vào giỏ hàng`, toastConfig)
    } else {
      setOpenDialog(true)
    }
  }

  const renderBgColor =
    (data.promotion.name?.toLowerCase() === "giare" && "#1A73E8") ||
    (data.promotion.name?.toLowerCase() === "giamgia" && "#ea1b23") ||
    (data.promotion.name?.toLowerCase() === "moiramat" && "#00a650") ||
    (data.promotion.name?.toLowerCase() === "tragop" && "#f7941d")

  const renderLabel = () => {
    switch (data.promotion.name?.toLowerCase()) {
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

  const renderDiscount = () => {
    switch (data.promotion.name?.toLowerCase()) {
      case "tragop":
        return <span style={{ marginLeft: 5 }}>{data.promotion.value}%</span>
      case "giamgia":
        return <span style={{ marginLeft: 5 }}>{data.promotion.value}</span>
      default:
        return ""
    }
  }

  return (
    <>
      <Box
        borderRight={1}
        borderBottom={1}
        borderColor={borderColor}
        px={2}
        py={2}
        display="flex"
        flexDirection="column"
        sx={{ height: { xs: 320, lg: 360 } }}
      >
        <Link
          to={`/product/details/${data.productId}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            position: "relative",
          }}
        >
          <Box height={{ xs: 130, lg: 180 }}>
            <img
              src={data.photoImage}
              alt="IMG..."
              width="100%"
              height="100%"
              style={{
                transition: "all 0.3s",
                position: "relative",
                top: isHovered ? -5 : 0,
                objectFit: "contain",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </Box>
          {/* Khuyến mãi */}
          <Typography bgcolor={renderBgColor} className={classes.text}>
            {renderLabel()}
            {renderDiscount()}
          </Typography>
        </Link>

        <Box mt={2} display="flex" flexDirection="column" rowGap={0.5}>
          {/* Title */}
          <Typography className={classes.lineClampText}>
            {data.title}
          </Typography>
          {/* Giá */}
          {data.promotion.name === "giare" ? (
            data.promotion.value !== "" ? (
              <div>
                <span style={{ color: "#BB161C", fontSize: 18 }}>
                  {data.promotion.value + " ₫"}
                </span>
                <NumberFormat
                  value={data.price}
                  color="inherit"
                  TextProps={{
                    fontSize: 14,
                    sx: { textDecoration: "line-through" },
                  }}
                />
              </div>
            ) : (
              <NumberFormat
                value={data.price}
                color="#BB161C"
                TextProps={{ fontSize: 18 }}
              />
            )
          ) : (
            <NumberFormat
              value={data.price}
              color="#BB161C"
              TextProps={{ fontSize: 18 }}
            />
          )}
        </Box>
        <Box sx={{ marginTop: "auto" }}>
          {/* Rating */}
          <Box display="flex" alignItems="flex-end">
            {Array(data.star)
              .fill(0)
              .map((_, index) => (
                <StarIcon
                  key={index}
                  fontSize="small"
                  sx={{ color: "orange" }}
                />
              ))}
            <Typography
              fontSize={13}
              color="gray"
              ml={1}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {data.rateCount} đánh giá
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={handleAddToCart}
            disabled={inCart(data.productId) ? true : false}
            sx={{
              mt: 2,
              padding: "10px 0",
              fontSize: { xs: 12, lg: 14 },
              width: "100%",
            }}
          >
            {inCart(data.productId) ? "Đã thêm" : "Thêm vào giỏ hàng"}
          </Button>
        </Box>
      </Box>

      <AlertDialog
        open={openDialog}
        handleClose={handleClose}
        content="Bạn cần đăng nhập để mua hàng"
        leftButton="Đóng"
        onClickLeftButton={handleClose}
        rightButton="Đăng nhập"
        onClickRightButton={() => navigate("/login", { replace: true })}
        fullWidthButton
      />
    </>
  )
}

export default createComponentWithAuth(ProductListRow)
