import { Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProductListRow from "components/common/ProductList/ProductListRow"
import { swiperConfig } from "configs/swiper"
import { ICustomAPIResponse } from "models/product"
import { primaryDark } from "styles/config"
import { Swiper, SwiperSlide } from "swiper/react"

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
}))

interface ProductBrandProps {
  data: ICustomAPIResponse[]
  title: string
  row: number
}

const RenderProduct = ({ data, title, row }: ProductBrandProps) => {
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

export default RenderProduct
