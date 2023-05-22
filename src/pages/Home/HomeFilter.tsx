import { Grid } from "@mui/material"
import FormInputDropDown from "components/common/FormInput/FormInputDropDown"

const sortPrice = [
  {
    label: "Dưới 2 triệu",
    value: "Dưới 2 triệu",
  },
  {
    label: "Từ 2 - 4 triệu",
    value: "Từ 2 - 4 triệu",
  },
  {
    label: "Từ 4 - 7 triệu",
    value: "Từ 4 - 7 triệu",
  },
]

const HomeFilter = () => {
  return (
    <Grid
      container
      columnGap={1}
      justifyContent="center"
      mt={5}
      display={{ xs: "none", md: "flex" }}
    >
      <Grid item xs={2}>
        <FormInputDropDown label="Giá tiền" name="price" options={sortPrice} />
      </Grid>
      <Grid item xs={2}>
        <FormInputDropDown
          label="Khuyến mãi"
          name="saleOff"
          options={sortPrice}
        />
      </Grid>
      <Grid item xs={2}>
        <FormInputDropDown
          label="Số lượng sao"
          name="starCount"
          options={sortPrice}
        />
      </Grid>
      <Grid item xs={2}>
        <FormInputDropDown label="Sắp xếp" name="sort" options={sortPrice} />
      </Grid>
    </Grid>
  )
}

export default HomeFilter
