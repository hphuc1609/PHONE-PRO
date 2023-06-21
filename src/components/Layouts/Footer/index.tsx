import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box
      textAlign="center"
      p={2}
      bgcolor="#f0f0f0"
      display="flex"
      justifyContent="center"
    >
      <Typography color="inherit" display="flex">
        Copyright © 2023
        <Typography
          component="a"
          href="/"
          color="primary"
          fontWeight={600}
          sx={{ textDecoration: "none", ml: 0.5 }}
        >
          PhonePro
        </Typography>
      </Typography>
    </Box>
  )
}

export default Footer
