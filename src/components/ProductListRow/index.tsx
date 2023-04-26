import StarIcon from "@mui/icons-material/Star"
import { Box, Button, Grid, Icon, Typography } from "@mui/material"
import type { ICustomAPIResponse } from "models/api"
import { Link } from "react-router-dom"
import { appBackground } from "styles/config"

interface Props {
  title: string
  icon: React.ReactNode
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
          <Grid container borderColor="#e8e8e8">
            {products?.map((item, index) => (
              <Grid
                key={index}
                item
                xs={3}
                border={1}
                borderColor="#e8e8e8"
                p={2}
              >
                <Link
                  to=""
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.productPhotoImage}
                    alt="..."
                    width="fit-content"
                    height={250}
                    style={{ margin: "0 auto", display: "flex" }}
                  />
                  <Box mt={2}>
                    <Typography>{item.productName}</Typography>
                    <Typography fontWeight={500}>
                      {item.productPrice + " đ"}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      {Array(item.productStar)
                        .fill(0)
                        .map((_, index) => (
                          <StarIcon
                            key={index}
                            fontSize="small"
                            sx={{ color: "orange" }}
                          />
                        ))}
                      <Typography fontSize={13} color="gray" ml={1}>
                        {item.productRateCount + " đánh giá"}
                      </Typography>
                    </Box>
                  </Box>

                  {item.productPromotion?.name && (
                    <Typography
                      bgcolor={
                        item.productPromotion?.name === "Sale"
                          ? "#ea1b23"
                          : "" || item.productPromotion?.name === "New"
                          ? "#00a650"
                          : "" || item.productPromotion?.name === "Trả góp"
                          ? "#f7941d"
                          : ""
                      }
                      position="absolute"
                      top={0}
                      right={0}
                      width="fit-content"
                      p="12px 8px"
                      borderRadius="50%"
                      color="white"
                      fontWeight={600}
                      sx={{ textShadow: "0 0 2px #fafafa" }}
                    >
                      {item.productPromotion?.name}
                    </Typography>
                  )}
                </Link>

                <Button variant="outlined" sx={{ mt: 2 }}>
                  Thêm vào giỏ hàng
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductListRow
