import {
  HeadsetMic,
  LocalShipping,
  Loop,
  VerifiedUser,
} from "@mui/icons-material"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
  root: {
    height: 100,
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid gray",
    background: "#F1F6F9",
    padding: 40,
  },
  text: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
}))

const Services = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box
        sx={{
          width: { xs: "100%", xl: 1500 },
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box className={classes.text}>
          <LocalShipping fontSize="large" color="secondary" />
          Giao hàng hỏa tốc trong 1 giờ
        </Box>
        <Box className={classes.text}>
          <VerifiedUser fontSize="large" color="secondary" />
          Hàng chính hãng 100%
        </Box>
        <Box className={classes.text}>
          <HeadsetMic fontSize="large" color="secondary" />
          Hotline hỗ trợ 1234.5678
        </Box>
        <Box className={classes.text}>
          <Loop fontSize="large" color="secondary" />
          Thủ tục đổi trả dễ dàng
        </Box>
      </Box>
    </Box>
  )
}

export default Services
