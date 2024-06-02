import {
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnOutlined,
} from "@mui/icons-material"
import { Box, Grid, Typography } from "@mui/material"
import FormContact from "./ContactForm"

const ContactInfo = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thông tin liên hệ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box gap={1} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <LocationOnOutlined />
            <Typography variant="body1" ml={1}>
              Địa chỉ:
            </Typography>
          </Box>
          <Typography variant="body1">
            Thành phố Hồ Chí Minh, Việt Nam
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box gap={1} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <LocalPhoneOutlined />
            <Typography variant="body1" ml={1}>
              Telephone:
            </Typography>
          </Box>
          <Typography
            variant="body1"
            component="a"
            href="tel: 0796101169"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            123 456 xxx
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box gap={1} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <EmailOutlined />
            <Typography variant="body1" ml={1}>
              Mail:
            </Typography>
          </Box>
          <Typography
            variant="body1"
            component="a"
            href="mailto: phucluu1609@gmail.com"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            phonepro@support.vn
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormContact />
      </Grid>
    </>
  )
}

export default ContactInfo
