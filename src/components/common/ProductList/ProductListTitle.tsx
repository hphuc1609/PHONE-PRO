import { ChevronRightOutlined } from "@mui/icons-material"
import { Box, Button, Icon, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import { primaryDark } from "styles/config"

interface Props {
  title: string
  icon?: React.ReactNode
  disable?: boolean
}

const useStyles = makeStyles(() => ({
  heading: {
    background: primaryDark,
    color: "white",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    padding: "5px 4px 5px 12px",
    textTransform: "capitalize",
    width: "fit-content",
  },
}))

const ProductListTitle = ({ title, icon, disable = false }: Props) => {
  const classes = useStyles()

  // const handleShowMore = () => {}

  return (
    <>
      <Box
        bgcolor="#e8e8e8"
        width="100%"
        mt={8}
        sx={{
          borderTop: `2px solid ${primaryDark}`,
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" className={classes.heading}>
          {title}
          {icon && (
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
          )}
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
