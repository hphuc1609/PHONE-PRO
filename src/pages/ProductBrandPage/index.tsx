import { KeyboardArrowLeft } from "@mui/icons-material"
import { Button, Grid, Pagination, Typography } from "@mui/material"
import { realtimeDB } from "Firebase/firebaseConfig"
import Loading from "components/Loading"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Swiper, SwiperSlide } from "swiper/react"

const ProductPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = location.pathname.split("/")

  const [showLoading, setShowLoading] = useState(false)
  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  const [currentPage, setCurrentPage] = useState(1)

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
        setShowLoading(false)
      })
  }, [])

  const handleBackHome = () => {
    navigate("/")
  }

  const filteredProduct = productList?.filter(
    (product) => product.company?.toLowerCase() === params[3]
  )

  const productsPerPage = 5
  const totalProducts = filteredProduct.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
  }
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  return (
    <div>
      <Button variant="text" onClick={handleBackHome} color="inherit">
        <KeyboardArrowLeft fontSize="small" />
        Trở về trang chủ
      </Button>

      <Loading open={showLoading} />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{
              backgroundImage: "linear-gradient(to right, #3977ce, #2e3192)",
              color: "#fff",
              padding: "10px 0",
              textTransform: "capitalize",
            }}
          >
            {`Điện thoại ${params[3]}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Swiper
            {...swiperConfig}
            // grid={{ rows: currentPage, fill: "row" }}
            navigation={false}
            allowTouchMove={false}
            autoplay={
              autoplayEnabled && { delay: 100, disableOnInteraction: false }
            }
          >
            {filteredProduct.map((product) => (
              <SwiperSlide key={product.productId}>
                <ProductListRow data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductPage
