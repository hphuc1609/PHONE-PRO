import { Box, Grid, Typography } from "@mui/material"
import { animated, useSpring } from "@react-spring/web"
import { Helmet } from "react-helmet"
import TableDetail from "./GuaranteeTable"

const GuaranteePage = () => {
  const springProps = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
    delay: 100,
    config: { duration: 15000 },
    loop: true,
  })

  return (
    <>
      <Helmet>
        <title>Phone Pro - Trung tâm bảo hành</title>
        <meta name="description" content="Description of Guarantee Page ..." />
      </Helmet>

      <Grid container>
        <Grid item xs={12}>
          <Box
            p={3}
            sx={{ bgcolor: (theme) => theme.palette.primary.dark }}
            overflow="hidden"
          >
            <animated.div style={springProps}>
              <Typography
                variant="h5"
                color="white"
                component="h1"
                textTransform="uppercase"
                letterSpacing={1}
                fontWeight={600}
                sx={{ pointerEvents: "none" }}
                fontSize={{ xs: "1rem", md: "2rem" }}
                whiteSpace={"nowrap"}
              >
                Danh sách các trung tâm bảo hành tại Phone Pro
              </Typography>
            </animated.div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableDetail />
        </Grid>
      </Grid>
    </>
  )
}

export default GuaranteePage
