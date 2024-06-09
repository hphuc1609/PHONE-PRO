import { Box, Divider, Grid, Typography } from "@mui/material"
import { ISpecifications } from "models/product"
import { borderColor } from "styles/config"

interface ProductInfoProps {
  item: ISpecifications
}

const ProductInfo = ({ item }: ProductInfoProps) => {
  const details = [
    {
      label: "Màn hình",
      value: item.screen,
    },
    {
      label: "Hệ điều hành",
      value: item.os,
    },
    {
      label: "Camara sau",
      value: item.camera,
    },
    {
      label: "Camara trước",
      value: item.cameraFront,
    },
    {
      label: "CPU",
      value: item.cpu,
    },
    {
      label: "RAM",
      value: item.ram,
    },
    {
      label: "Bộ nhớ trong",
      value: item.rom,
    },
    {
      label: "Thẻ nhớ",
      value: item.microUSB,
    },
    {
      label: "Dung lương pin",
      value: item.battery,
    },
  ]

  return (
    <Grid container item border={1} borderColor={borderColor} borderBottom={0}>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={600} textAlign="center" py={1}>
          Thông số kỹ thuật
        </Typography>
        <Divider />
      </Grid>
      {details.map((detail) => (
        <Grid key={detail.label} item xs={12}>
          <Box
            display="flex"
            columnGap={3}
            alignItems="center"
            borderBottom={1}
            borderColor={borderColor}
            height={"100%"}
            px={2}
          >
            <Typography
              maxWidth={130}
              width="100%"
              height={"100%"}
              borderRight={1}
              borderColor={borderColor}
              py={2}
            >
              {detail.label}
            </Typography>
            <Typography>{detail.value}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductInfo
