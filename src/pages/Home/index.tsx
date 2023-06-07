import { Close } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { realtimeDB } from "Firebase/firebaseConfig"
import SlideSwiper from "components/Banner"
import Loading from "components/Loading"
import RenderProduct from "components/common/RenderProduct"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import "swiper/css"
import "swiper/css/navigation"
import HomeFilter from "./HomeFilter"
import HomeProduct from "./HomeProduct"
import MenuList from "./MenuList"
import "./style.css"

const HomePage = () => {
  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  const [productBrand, setProductBrand] = useState([])
  const [showLoading, setShowLoading] = useState(false)
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [title, setTitle] = useState("")

  // Filter price, promotion,
  const [filterPrice, setFilterPrice] = useState("")
  const [filterPromo, setFilterPromo] = useState("")
  const [filterStar, setFilterStar] = useState("")

  const filteredProductsPrice = productList?.filter((product) => {
    switch (filterPrice) {
      case "Dưới 2 triệu":
        return product.price < 2000000
      case "Từ 2 - 4 triệu":
        return product.price >= 2000000 && product.price < 4000000
      case "Từ 4 - 7 triệu":
        return product.price >= 4000000 && product.price < 7000000
      default:
        return true
    }
  })

  const filteredProductsPromotion = productList?.filter((product) => {
    switch (filterPromo) {
      case "Giảm giá":
        return product.promotion.name?.toLowerCase() === "giamgia"
      case "Mới ra mắt":
        return product.promotion.name?.toLowerCase() === "moiramat"
      case "Trả góp":
        return product.promotion.name?.toLowerCase() === "tragop"
      case "Giá rẻ online":
        return product.promotion.name?.toLowerCase() === "giare"
      default:
        return true
    }
  })

  const filteredProductsStar = productList?.filter((product) => {
    switch (filterStar) {
      case "Trên 2 sao":
        return product.star > 2
      case "Trên 3 sao":
        return product.star > 3
      case "Trên 4 sao":
        return product.star > 4
      default:
        return true
    }
  })

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

  const handleFilterPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPrice(event.target.value)
    setIsShowProduct(true)
  }
  const handleFilterPromo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPromo(event.target.value)
    setIsShowProduct(true)
  }
  const handleFilterStar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStar(event.target.value)
    setIsShowProduct(true)
  }

  const handleClearFilter = () => {
    setIsShowProduct(false)
    setProductBrand([])
    setFilterPrice("")
    setFilterPromo("")
    setFilterStar("")
  }

  // const toTableOptions = (tables: string[]): IAutocompleteOption[] =>
  //   tables.map((table) => ({ label: table, value: table }));

  return (
    <>
      <Helmet>
        <title>Phone Pro - Trang chủ</title>
        <meta name="description" content="Description of HomePage ..." />
      </Helmet>

      <Loading open={showLoading} />

      {/* Banner */}
      <SlideSwiper />
      <Box width="100%" mt={2}>
        <img
          src="../assets/blackFriday.gif"
          alt="img..."
          width="100%"
          height="100%"
          style={{ objectFit: "fill" }}
        />
      </Box>

      {/* Company Menu */}
      <MenuList
        products={productList}
        setTitle={setTitle}
        setProductBrand={setProductBrand}
        setIsShowProduct={setIsShowProduct}
      />

      {/* Filter Options */}
      <HomeFilter
        filterPrice={filterPrice}
        handleFilterPrice={handleFilterPrice}
        filterPromo={filterPromo}
        handleFilterPromo={handleFilterPromo}
        filterStar={filterStar}
        handleFilterStar={handleFilterStar}
      />

      {/* Show list product follow company filter */}
      {isShowProduct ? (
        <>
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleClearFilter}
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Close fontSize="small" />
              <Typography variant="subtitle2">Xóa lọc</Typography>
            </Button>
          </Grid>

          {productBrand.length !== 0 && (
            <RenderProduct
              data={productBrand}
              title={`Điện thoại ${title}`}
              row={productBrand?.length}
            />
          )}

          {filterPrice && (
            <RenderProduct
              data={filteredProductsPrice}
              title={`Sản phẩm ${filterPrice}`}
              row={filteredProductsPrice?.length}
            />
          )}

          {filterPromo && (
            <RenderProduct
              data={filteredProductsPromotion}
              title={`Sản phẩm ${filterPromo}`}
              row={filteredProductsPromotion?.length}
            />
          )}

          {filterStar && (
            <RenderProduct
              data={filteredProductsStar}
              title={`Sản phẩm ${filterStar}`}
              row={filteredProductsStar?.length}
            />
          )}
        </>
      ) : (
        <HomeProduct productList={productList} />
      )}
    </>
  )
}

export default HomePage
