import { Refresh } from "@mui/icons-material"
import { Button, Grid, IconButton, Tooltip } from "@mui/material"
import FormInputDropDown from "components/common/FormInput/FormInputDropDown"
import { Control, Controller, FieldValues } from "react-hook-form"
import { priceOptions, promoOptions, starCountOptions } from "utils/options"

interface HomeFilterProps {
  control: Control<FieldValues>
  isDirty: boolean
  handleClickFilter: () => void
  handleClearFilter: () => void
}

const HomeFilter = ({
  control,
  isDirty,
  handleClickFilter,
  handleClearFilter,
}: HomeFilterProps) => {
  return (
    <Grid
      container
      columnGap={1}
      mt={5}
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <FormInputDropDown
              {...field}
              label="Giá tiền"
              name="price"
              options={priceOptions}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={control}
          name="promotion"
          render={({ field }) => (
            <FormInputDropDown
              {...field}
              label="Khuyến mãi"
              name="promotion"
              options={promoOptions}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={control}
          name="starCount"
          render={({ field }) => (
            <FormInputDropDown
              {...field}
              label="Số lượng sao"
              name="starCount"
              options={starCountOptions}
            />
          )}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <Button
          onClick={handleClickFilter}
          variant="contained"
          disabled={!isDirty}
          disableElevation
          sx={{ padding: "8px 20px", fontWeight: 550 }}
        >
          Lọc
        </Button>
      </Grid>
      <Grid item xs={"auto"}>
        <Tooltip title="Xóa lọc" placement="top" arrow>
          <IconButton onClick={handleClearFilter} disabled={!isDirty}>
            <Refresh color={isDirty ? "primary" : "disabled"} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default HomeFilter
