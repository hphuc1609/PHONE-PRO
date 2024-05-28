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
      <Typography color="inherit" display="flex" gap={1}>
        <span>
          Copyright © {new Date().getFullYear()}
          <Typography
            component="a"
            href="/"
            color="primary"
            fontWeight={600}
            sx={{ ml: 0.5 }}
          >
            PhonePro
          </Typography>
          .
        </span>
        All Rights Reserved
      </Typography>
    </Box>
  )
}

export default Footer
