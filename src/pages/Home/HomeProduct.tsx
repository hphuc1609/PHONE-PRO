import {
  Discount,
  MonetizationOn,
  NewReleases,
  Whatshot,
} from "@mui/icons-material"
import { Grid } from "@mui/material"
import ProductListRow from "components/common/ProductList/ProductListRow"
import ProductListTitle from "components/common/ProductList/ProductListTitle"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

SwiperCore.use([Navigation])

interface Props {
  productList: ICustomAPIResponse[]
}

const HomeProduct = ({ productList }: Props) => {
  return (
    <>
      <Grid container>
        <Grid container item rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Sản phẩm nổi bật"
              icon={<Whatshot color="error" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
              {productList.map(
                (item) =>
                  item.promotion.name?.toLowerCase() === "giare" && (
                    <SwiperSlide key={item.productId}>
                      <ProductListRow data={item} />
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
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Trả góp 0%"
              icon={<MonetizationOn color="warning" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
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
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <ProductListTitle
              title="Giảm giá sốc"
              icon={<Discount color="error" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Swiper {...swiperConfig}>
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
    </>
  )
}

export default HomeProduct
