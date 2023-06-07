import { Box, Grid } from "@mui/material"
import GoogleMap from "google-map-react"
import { Helmet } from "react-helmet"
import ContactInfo from "./ContactInfo"

const ContactPage = () => {
  const googleMapProps = {
    center: {
      lat: 10.86736686846533,
      lng: 106.63562631355154,
    },
    zoom: 20,
  }
  const AnyReactComponent = ({ text }: any) => <div>{text}</div>

  return (
    <>
      <Helmet>
        <title>Phone Pro - Liên hệ chúng tôi</title>
        <meta name="description" content="Description of Contact Page ..." />
      </Helmet>

      <Grid container spacing={{ xs: 2, md: 5 }}>
        <Grid container item xs={6} spacing={2}>
          <ContactInfo />
        </Grid>

        <Grid item xs={6}>
          <Box width="100%" height={500}>
            <GoogleMap
              bootstrapURLKeys={{
                key: import.meta.env.VITE_API_KEY || "",
              }}
              defaultCenter={googleMapProps.center}
              defaultZoom={googleMapProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Maker"
              />
            </GoogleMap>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ContactPage
