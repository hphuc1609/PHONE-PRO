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
        <Grid container columnGap={1} display="flex" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <LocationOnOutlined />
              <Typography variant="body1" fontWeight={600} ml={1}>
                Địa chỉ:
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Dương Thị Mười, Tân Thới Hiệp, Quận 12
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnGap={1} display="flex" alignItems="center">
          <Grid item xs={0}>
            <Box display="flex" alignItems="center">
              <LocalPhoneOutlined />
              <Typography variant="body1" fontWeight={600} ml={1}>
                Telephone:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={0}>
            <Typography
              variant="body1"
              component="a"
              href="tel: 0796101169"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              079 610 1169
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnGap={1} display="flex" alignItems="center">
          <Grid item xs={0}>
            <Box display="flex" alignItems="center">
              <EmailOutlined />
              <Typography variant="body1" fontWeight={600} ml={1}>
                Email:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={0}>
            <Typography
              variant="body1"
              component="a"
              href="mailto: phucluu1609@gmail.com"
              color="inherit"
              sx={{ textDecoration: "none" }}
            >
              phucluu1609@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <FormContact />
      </Grid>
    </>
  )
}

export default ContactInfo
