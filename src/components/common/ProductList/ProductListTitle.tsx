import { ChevronRightOutlined } from "@mui/icons-material"
import { Box, Button, Icon, Typography } from "@mui/material"
import React from "react"
import { primaryDark } from "styles/config"

interface Props {
  title: string
  icon: React.ReactNode
  disable?: boolean
}

const ProductListTitle = ({ title, icon, disable = false }: Props) => {
  // const handleShowMore = () => {}

  return (
    <>
      <Box
        bgcolor="#e8e8e8"
        width="100%"
        mt={5}
        sx={{
          borderTop: `2px solid ${primaryDark}`,
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          bgcolor={primaryDark}
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
        {!disable ? (
          <Button color="inherit">
            <Typography
              fontSize={{ xs: 12, md: 15 }}
              textTransform="capitalize"
            >
              Xem thêm
            </Typography>
            <ChevronRightOutlined fontSize="small" />
          </Button>
        ) : null}
      </Box>
    </>
  )
}

export default ProductListTitle
