import { Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import { borderColor } from "styles/config"
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"

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

const TableProduct = ({ data, title, row = 1 }: ProductBrandProps) => {
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
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Swiper
          {...config}
          grid={{ rows: row, fill: "row" }}
          style={{
            borderTop: "1px solid",
            borderLeft: "1px solid",
            borderColor: borderColor,
          }}
        >
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

export default TableProduct
