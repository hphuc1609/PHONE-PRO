import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box
      textAlign="center"
      p={2}
      bgcolor="#f0f0f0"
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <Typography color="inherit" mr={0.5} display="flex">
        Copyright © 2023
        <Typography
          component="a"
          href="/"
          color="primary"
          fontWeight={600}
          ml={0.5}
          sx={{ textDecoration: "none" }}
        >
          PhonePro
        </Typography>
      </Typography>
    </Box>
  )
}

export default Footer
