import { Stars } from "@mui/icons-material"
import { Grid } from "@mui/material"
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
import { realtimeDB } from "utils/firebaseConfig"
import Detail from "./ProductDetail"

import "swiper/css"
import "swiper/css/grid"

SwiperCore.use([GridSwiper])

const Product = () => {
  const location = useLocation()

  const [showLoading, setShowLoading] = useState(false)
  const [productList, setProductList] = useState([])
  const [newProduct, setNewProduct] = useState([])

  const splitproductId = location.pathname.split("/")[2]
  const filteredProduct = productList?.filter(
    (product) => product.productId === splitproductId
  )

  useEffect(() => {
    const getMultipleRandom = (arr: string[], num: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      setNewProduct(shuffled.slice(0, num))
    }

    getMultipleRandom(productList, 10)
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
        <Grid container rowSpacing={2} mt={10}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Bạn có thể thích ?"
              icon={<Stars color="warning" />}
              disable
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper
              {...swiperConfig}
              slidesPerView={5}
              grid={{ rows: 2, fill: "row" }}
            >
              {newProduct?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductListRow data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Product
