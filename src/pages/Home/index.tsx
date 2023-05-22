import {
  Close,
  HeadsetMic,
  LocalShipping,
  Loop,
  VerifiedUser,
} from "@mui/icons-material"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { realtimeDB } from "Firebase/firebaseConfig"
import SlideSwiper from "components/Banner"
import Loading from "components/Loading"
import FormInputDropDown from "components/common/FormInput/FormInputDropDown"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { primaryDark } from "styles/config"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { companies } from "utils/company"
import HomeProduct from "./HomeProduct"
import "./style.css"
import HomeFilter from "./HomeFilter"

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
    textTransform: "capitalize",
    padding: 8,
    borderRadius: 100,
    textAlign: "center",
    color: "white",
    backgroundImage: `linear-gradient(to right, #3977ce, ${primaryDark})`,
    transform: "translateY(-1.05em)",
  },
  ensured: {
    height: 100,
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid gray",
    background: "#F1F6F9",
    margin: "64px -40px -40px",
    padding: 40,
  },
  text: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
}))

interface ProductBrandProps {
  data: ICustomAPIResponse[]
  title: string
  row: number
}

const RenderProductBrand = ({ data, title, row }: ProductBrandProps) => {
  const classes = useStyles()

  return (
    <Grid container mt={8} border="2px solid #3977ce">
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} px={1} pb={3}>
        <Swiper {...swiperConfig} grid={{ rows: row, fill: "row" }}>
          {data.map((item) => (
            <SwiperSlide key={item.productId}>
              <ProductListRow data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  )
}

const HomePage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  const [productBrand, setProductBrand] = useState([])
  const [showLoading, setShowLoading] = useState(false)
  const [isShowProduct, setIsShowProduct] = useState(false)
  const [title, setTitle] = useState("")

  // const toTableOptions = (tables: string[]): IAutocompleteOption[] =>
  //   tables.map((table) => ({ label: table, value: table }));

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

  const ShowProductFromBrand = (value: string) => {
    if (value) {
      const filteredProduct = productList.filter(
        (product) => product.company === value
      )
      setProductBrand(filteredProduct)
      setTitle(value)
      setIsShowProduct(true)
      navigate(`/brand/${value}`)
    }

    window.scroll({
      top: 1000,
      behavior: "smooth",
    })
  }

  return (
    <>
      <Helmet>
        <title>Phone Pro - Trang chủ</title>
        <meta name="description" content="Description of HomePage ..." />
      </Helmet>

      <Loading open={showLoading} />
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

      <Paper variant="outlined" sx={{ mt: 5 }}>
        <Typography
          variant="h5"
          textTransform="capitalize"
          fontWeight={600}
          px={3}
          pt={2}
        >
          Danh mục sản phẩm
        </Typography>
        <Grid
          container
          py={3}
          display={{ xs: "none", md: "flex" }}
          justifyContent="center"
        >
          {/* Render menu list brands company */}
          {companies.map((item) => (
            <Grid
              item
              xs={0}
              key={item.value}
              sx={{
                "&.MuiGrid-root": {
                  transition: "all ease 0.3s ",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <Button onClick={() => ShowProductFromBrand(item.value)}>
                <img
                  src={item.image}
                  alt={item.label}
                  height={30}
                  width={130}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <HomeFilter />
      {/* List product follow title */}
      {isShowProduct ? (
        <>
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setIsShowProduct(false)}
              sx={{ fontSize: 13 }}
            >
              <Close fontSize="small" />
              Xóa lọc
            </Button>
          </Grid>
          <RenderProductBrand
            data={productBrand}
            title={`Điện thoại ${title}`}
            row={productBrand.length}
          />
        </>
      ) : (
        <HomeProduct productList={productList} />
      )}

      <Box className={classes.ensured}>
        <Box className={classes.text}>
          <LocalShipping fontSize="large" color="secondary" />
          Giao hàng hỏa tốc trong 1 giờ
        </Box>
        <Box className={classes.text}>
          <VerifiedUser fontSize="large" color="secondary" />
          Hàng chính hãng 100%
        </Box>
        <Box className={classes.text}>
          <HeadsetMic fontSize="large" color="secondary" />
          Hotline hỗ trợ 1234.5678
        </Box>
        <Box className={classes.text}>
          <Loop fontSize="large" color="secondary" />
          Thủ tục đổi trả dễ dàng
        </Box>
      </Box>
    </>
  )
}

export default HomePage
