import { ShoppingBasket } from "@mui/icons-material"
import { Grid } from "@mui/material"
import { realtimeDB } from "Firebase/firebaseConfig"
import Loading from "components/Loading"
import ProductListRow from "components/common/ProductList/ProductListRow"
import ProductListTitle from "components/common/ProductList/ProductListTitle"
import { swiperConfig } from "configs/swiper"
import { toastConfig } from "configs/toast"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import SwiperCore, { Grid as GridSwiper } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Detail from "./ProductDetail"

import "swiper/css"
import "swiper/css/grid"
import CommentBox from "components/CommentBox"

SwiperCore.use([GridSwiper])

const ProductDetail = () => {
  const location = useLocation()

  const [showLoading, setShowLoading] = useState(false)
  const [productList, setProductList] = useState([])
  const [newProduct, setNewProduct] = useState([])

  const paramsId = location.pathname.split("/")[3]

  const filteredProduct = productList.filter(
    (product) => product.productId === paramsId
  )

  useEffect(() => {
    const getProductRandom = (arr: string[], num: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      setNewProduct(shuffled.slice(0, num))
    }

    getProductRandom(productList, 10)
  }, [productList])

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
      <Loading open={showLoading} />

      <Detail data={filteredProduct} />

      {!showLoading && (
        <>
          <CommentBox />
          <Grid container rowSpacing={2} mt={10}>
            <Grid item xs={12}>
              <ProductListTitle
                title="Các sản phẩm khác"
                icon={<ShoppingBasket color="error" />}
                disable
              />
            </Grid>
            <Grid item xs={12}>
              <Swiper {...swiperConfig} grid={{ rows: 2, fill: "row" }}>
                {newProduct?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductListRow data={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductDetail
