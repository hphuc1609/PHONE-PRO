import { ShoppingBasket } from "@mui/icons-material"
import { Box, Grid, Skeleton } from "@mui/material"
import { realtimeDB } from "Firebase/firebaseConfig"
import CommentBox from "components/CommentBox"
import ProductListRow from "components/common/ProductList/ProductListRow"
import ProductListTitle from "components/common/ProductList/ProductListTitle"
import { swiperConfig } from "configs/swiper"
import { toastConfig } from "configs/toast"
import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import SwiperCore, { Grid as GridSwiper } from "swiper"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import Detail from "./ProductDetail"

import "swiper/css"
import "swiper/css/grid"
import { makeStyles } from "@mui/styles"
import { borderColor } from "styles/config"

SwiperCore.use([GridSwiper])

const useStyles = makeStyles(() => ({
  swiper: {
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderColor: borderColor,
  },
}))

const LoadingDetail = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Skeleton
        variant="text"
        height={45}
        sx={{ width: { xs: 300, md: 500 } }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={"100%"}
            sx={{ height: { xs: 150, md: 300 } }}
          />
        ))}
      </Box>
    </div>
  )
}

const Product = () => {
  const location = useLocation()
  const classes = useStyles()
  const [showLoading, setShowLoading] = useState(false)
  const [productList, setProductList] = useState([])
  const [newProduct, setNewProduct] = useState([])
  const paramsId = location.pathname.split("/")[3]

  const filteredProduct = useMemo(
    () => productList.filter((product) => product.productId === paramsId),
    [productList, paramsId]
  )

  const config: SwiperProps = {
    ...swiperConfig,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 5,
      },
    },
  }

  // Get 10 random product
  useEffect(() => {
    const getProductRandom = (arr: string[], num: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      setNewProduct(shuffled.slice(0, num))
    }

    getProductRandom(productList, 10)
  }, [productList])

  // Get all product
  useEffect(() => {
    setShowLoading(true)
    realtimeDB
      .ref("products")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          setProductList(data)
        } else {
          toast.error("No data available!", toastConfig)
        }
      })
      .finally(() => {
        toast.clearWaitingQueue()
        setShowLoading(false)
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>Phone Pro - Chi tiết sản phẩm</title>
        <meta name="description" content="Description of Product details ..." />
      </Helmet>

      <Detail data={filteredProduct} />
      {!showLoading ? (
        <>
          <CommentBox />
          <Grid container mt={10}>
            <Grid item xs={12}>
              <ProductListTitle
                title="Các sản phẩm khác"
                icon={<ShoppingBasket color="error" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Swiper {...config} className={classes.swiper}>
                {newProduct?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductListRow data={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </>
      ) : (
        <LoadingDetail />
      )}
    </>
  )
}

export default Product
