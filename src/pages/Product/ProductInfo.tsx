import { Box, Divider, Grid, Typography } from "@mui/material"
import { ISpecifications } from "models/product"
import { borderColor } from "styles/config"

interface Props {
  item: ISpecifications
}

const ProductInfo = ({ item }: Props) => {
  return (
    <>
      <Grid container item border={1} borderColor={borderColor} p={1}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="p"
            fontWeight={600}
            textAlign="center"
            gutterBottom
          >
            Thông số kỹ thuật
          </Typography>
          <Divider />
        </Grid>
        <Grid container item p={1} rowSpacing={2}>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Màn hình
              </Typography>
              <Typography>{item.screen}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Hệ điều hành
              </Typography>
              <Typography>{item.os}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Camara sau
              </Typography>
              <Typography>{item.camera}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Camara trước
              </Typography>
              <Typography>{item.cameraFront}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                CPU
              </Typography>
              <Typography>{item.cpu}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                RAM
              </Typography>
              <Typography>{item.ram}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Bộ nhớ trong
              </Typography>
              <Typography>{item.rom}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Thẻ nhớ
              </Typography>
              <Typography>{item.microUSB}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" columnGap={3} alignItems="center">
              <Typography maxWidth={110} width="100%">
                Dung lượng pin
              </Typography>
              <Typography>{item.battery}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductInfo
