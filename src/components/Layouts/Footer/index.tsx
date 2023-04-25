import { Box, Typography } from "@mui/material"
import theme from "styles/theme"

const Footer = () => {
  return (
    <Box borderTop="1px solid #ddd" textAlign="center" p={2} bgcolor="#e8e8e8">
      <Typography color="#000">
        All rights reserved © 2023 - Designed by <b>Hoang Phuc</b>
      </Typography>
    </Box>
  )
}

export default Footer
