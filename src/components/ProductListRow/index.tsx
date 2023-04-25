import { Box, Button, Grid, Icon, Typography } from "@mui/material"
import { ICustomAPIResponse } from "models/api"
import type { ReactNode } from "react"
import { appBackground } from "styles/config"

interface Props {
  title: string
  icon: ReactNode
  products?: ICustomAPIResponse[]
}

const ProductListRow = ({ title, icon, products }: Props) => {
  return (
    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Box
            bgcolor="#e8e8e8"
            width="100%"
            mt={5}
            sx={{
              borderTop: `2px solid ${appBackground}`,
            }}
          >
            <Typography
              variant="h6"
              bgcolor={appBackground}
              color="white"
              py={0.5}
              paddingLeft={2}
              paddingRight={0.5}
              sx={{
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                fontWeight: 500,
                textShadow: "0.5px 0.5px 1px #e8e8e8",
                display: "flex",
                alignItems: "center",
              }}
              textTransform="uppercase"
              width="fit-content"
            >
              {title}
              <Icon
                sx={{
                  borderRadius: 100,
                  bgcolor: "white",
                  ml: 1,
                  width: 30,
                  height: 30,
                }}
              >
                {icon}
              </Icon>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            columnGap={2}
            borderLeft={1}
            borderRight={1}
            borderColor="#e8e8e8"
          >
            {products?.map((product, index) => (
              <Grid
                key={index}
                item
                xs={2}
                margin="0 auto"
                borderRight={1}
                borderColor="#e8e8e8"
              >
                <img src={product.productPhotoImage} alt="..." height={200} />
                <Typography>{product.productName}</Typography>
                <Typography>{product.productPrice}</Typography>
                <Button variant="outlined">Thêm vào giỏ hàng</Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductListRow
