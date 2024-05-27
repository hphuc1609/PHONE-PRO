import { Grid, Typography } from "@mui/material"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import { Swiper, SwiperSlide } from "swiper/react"

interface ProductBrandProps {
  data: ICustomAPIResponse[]
  title: string
  row: number
  className?: ClassNameProps
}

interface ClassNameProps {
  root?: string
  title?: string
}

const RenderProduct = ({ data, title, row, className }: ProductBrandProps) => {
  return (
    <Grid container className={className.root}>
      <Grid item xs={12}>
        <Typography className={className.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} px={2} pb={3}>
        <Swiper {...swiperConfig} grid={{ rows: row, fill: "row" }}>
          {data.length > 0 ? (
            data.map((item) => (
              <SwiperSlide key={item.productId}>
                <ProductListRow data={item} />
              </SwiperSlide>
            ))
          ) : (
            <Typography variant="h5" align="center">
              Không có sản phẩm
            </Typography>
          )}
        </Swiper>
      </Grid>
    </Grid>
  )
}

export default RenderProduct
