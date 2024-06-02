import {
  Discount,
  MonetizationOn,
  NewReleases,
  Whatshot,
} from "@mui/icons-material"
import { Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProductListRow from "components/common/ProductList/ProductListRow"
import ProductListTitle from "components/common/ProductList/ProductListTitle"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import { borderColor } from "styles/config"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"

SwiperCore.use([Navigation])

const useStyles = makeStyles(() => ({
  swiper: {
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderColor: borderColor,
  },
}))

interface HomeProductProps {
  productList: ICustomAPIResponse[]
}

const HomeProduct = ({ productList }: HomeProductProps) => {
  const classes = useStyles()
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

  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={12}>
          <ProductListTitle
            title="Sản phẩm nổi bật"
            icon={<Whatshot color="error" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Swiper {...config} className={classes.swiper}>
            {productList.map(
              (item) =>
                item.star === 5 && (
                  <SwiperSlide key={item.productId}>
                    <ProductListRow data={item} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <ProductListTitle
            title="Sản phẩm mới"
            icon={<NewReleases color="secondary" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Swiper {...config} className={classes.swiper}>
            {productList.map(
              (item) =>
                item.promotion.name?.toLowerCase() === "moiramat" && (
                  <SwiperSlide key={item.productId}>
                    <ProductListRow data={item} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <ProductListTitle
            title="Trả góp 0%"
            icon={<MonetizationOn color="warning" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Swiper {...config} className={classes.swiper}>
            {productList.map(
              (item) =>
                item.promotion.name?.toLowerCase() === "tragop" && (
                  <SwiperSlide key={item.productId}>
                    <ProductListRow data={item} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <ProductListTitle
            title="Giảm giá sốc"
            icon={<Discount color="error" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Swiper {...config} className={classes.swiper}>
            {productList.map(
              (item) =>
                item.promotion.name?.toLowerCase() === "giamgia" && (
                  <SwiperSlide key={item.productId}>
                    <ProductListRow data={item} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomeProduct
