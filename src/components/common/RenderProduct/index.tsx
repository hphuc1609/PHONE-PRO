import { Grid, Theme, Typography, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import { Swiper, SwiperSlide } from "swiper/react"

const useStyles = makeStyles(() => ({
  title: {
    backgroundImage: "linear-gradient(to right, #3977ce, #2e3192)",
    color: "#fff",
    padding: "10px 0",
    textTransform: "capitalize",
    textAlign: "center",
  },
}))

interface ProductBrandProps {
  data: ICustomAPIResponse[]
  title: string
  row: number
}

const RenderProduct = ({ data, title, row }: ProductBrandProps) => {
  const classes = useStyles()
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography gutterBottom className={classes.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Swiper
          {...swiperConfig}
          slidesPerView={smallScreen ? 4 : 5}
          grid={{ rows: row, fill: "row" }}
        >
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
