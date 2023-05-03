import {
  ArrowRightOutlined,
  Discount,
  MonetizationOn,
  NewReleases,
  Whatshot,
} from "@mui/icons-material"
import { Grid, Typography, styled } from "@mui/material"
import SlideSwiper from "components/Banner"
import ProductListRow from "components/common/ProductListRow"
import ProductListTitle from "components/common/ProductListRow/ProductListTitle"
import { toastConfig } from "configs/toast"
import type { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { companyList } from "utils/CompanyList"
import { realtimeDB } from "utils/firebaseConfig"
import { swiperConfig } from "configs/swiper"

import "swiper/css"
import "swiper/css/navigation"
import "./style.css"
SwiperCore.use([Navigation])

const DropDown = styled(Grid)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
`

const HomePage = () => {
  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])

  useEffect(() => {
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
      .catch((error) => {
        toast.error(`Failed to get api because ${error}!`, toastConfig)
      })
      .finally(() => {
        toast.clearWaitingQueue()
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>Phone Pro - Trang chủ</title>
        <meta name="description" content="Description of HomePage ..." />
      </Helmet>

      <SlideSwiper />
      <Grid
        container
        spacing={1}
        marginTop={2}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
      >
        {companyList.map((item, index) => (
          <Grid
            item
            xs={0}
            key={index}
            sx={{
              "&.MuiGrid-root": {
                transition: "all ease 0.3s ",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <Link to={`company=${item.path}`} style={{ display: "block" }}>
              <img src={item.image} alt={item.name} height={30} width={130} />
            </Link>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        columnGap={1}
        justifyContent="center"
        mt={5}
        display={{ xs: "none", md: "flex" }}
      >
        <DropDown item xs={0}>
          <Typography>Giá tiền</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Khuyến mãi</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Số lượng sao</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
        <DropDown item xs={0}>
          <Typography>Sắp xếp</Typography>
          <ArrowRightOutlined color="primary" />
        </DropDown>
      </Grid>

      {/* Render product list api */}
      <Grid container rowGap={5}>
        <Grid container item rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Sản phẩm nổi bật"
              icon={<Whatshot color="error" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
              {productList?.map(
                (state) =>
                  state.productPromotion?.promotionName.toLowerCase() ===
                    "" && (
                    <SwiperSlide key={state.productID}>
                      <ProductListRow data={state} />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Sản phẩm mới"
              icon={<NewReleases color="secondary" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
              {productList?.map(
                (state) =>
                  state.productPromotion?.promotionName.toLowerCase() ===
                    "new" && (
                    <SwiperSlide key={state.productID}>
                      <ProductListRow data={state} />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Trả góp 0%"
              icon={<MonetizationOn color="warning" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
              {productList?.map(
                (state) =>
                  state.productPromotion?.promotionName.toLowerCase() ===
                    "trả góp" && (
                    <SwiperSlide key={state.productID}>
                      <ProductListRow data={state} />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Giảm giá sốc"
              icon={<Discount color="error" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig} loopedSlides={2}>
              {productList?.map(
                (state) =>
                  state.productPromotion?.promotionName.toLowerCase() ===
                    "sale" && (
                    <SwiperSlide key={state.productID}>
                      <ProductListRow data={state} />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
