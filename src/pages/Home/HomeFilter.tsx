import { Grid } from "@mui/material"
import FormInputDropDown from "components/common/FormInput/FormInputDropDown"
import { priceOptions, promoOptions, starCountOptions } from "utils/options"

interface Props {
  filterPrice: string
  handleFilterPrice: (event: React.ChangeEvent<HTMLInputElement>) => void

  filterPromo: string
  handleFilterPromo: (event: React.ChangeEvent<HTMLInputElement>) => void

  filterStar: string
  handleFilterStar: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HomeFilter = ({
  filterPrice,
  filterPromo,
  filterStar,
  handleFilterPrice,
  handleFilterPromo,
  handleFilterStar,
}: Props) => {
  return (
    <Grid
      container
      columnGap={1}
      justifyContent="center"
      mt={5}
      display={{ xs: "none", md: "flex" }}
    >
      <Grid item xs={2}>
        <FormInputDropDown
          label="Giá tiền"
          name="price"
          value={filterPrice}
          onChange={handleFilterPrice}
          options={priceOptions}
        />
      </Grid>
      <Grid item xs={2}>
        <FormInputDropDown
          label="Khuyến mãi"
          name="saleOff"
          value={filterPromo}
          onChange={handleFilterPromo}
          options={promoOptions}
        />
      </Grid>
      <Grid item xs={2}>
        <FormInputDropDown
          label="Số lượng sao"
          name="starCount"
          value={filterStar}
          onChange={handleFilterStar}
          options={starCountOptions}
        />
      </Grid>
      {/* <Grid item xs={2}>
        <FormInputDropDown label="Sắp xếp" name="sort" options={priceOptions} />
      </Grid> */}
    </Grid>
  )
}

export default HomeFilter
