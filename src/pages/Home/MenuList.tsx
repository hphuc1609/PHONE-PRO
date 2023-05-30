import { Button, Grid, Paper, Typography } from "@mui/material"
import { ICustomAPIResponse } from "models/product"
import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { companies } from "utils/company"

interface Props {
  products: ICustomAPIResponse[]
  setProductBrand: Dispatch<SetStateAction<ICustomAPIResponse[]>>
  setTitle: Dispatch<SetStateAction<string>>
  setIsShowProduct: Dispatch<SetStateAction<boolean>>
}

const MenuList = ({
  products,
  setProductBrand,
  setTitle,
  setIsShowProduct,
}: Props) => {
  const navigate = useNavigate()

  const ShowProductFromBrand = (value: string) => {
    if (value) {
      const filteredProduct = products?.filter(
        (product) => product.company === value
      )

      setProductBrand(filteredProduct)
      setTitle(value)
      setIsShowProduct(true)

      navigate(`/brand/${value}`)
    }

    window.scroll({
      top: 1000,
      behavior: "smooth",
    })
  }

  return (
    <Paper variant="outlined" sx={{ mt: 5 }}>
      <Typography
        variant="h5"
        textTransform="capitalize"
        fontWeight={600}
        px={3}
        pt={2}
      >
        Danh mục sản phẩm
      </Typography>
      <Grid
        container
        py={3}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
      >
        {/* Render menu list brands company */}
        {companies.map((item) => (
          <Grid
            item
            xs={0}
            key={item.value}
            sx={{
              "&.MuiGrid-root": {
                transition: "all ease 0.3s ",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            }}
          >
            <Button onClick={() => ShowProductFromBrand(item.value)}>
              <img src={item.image} alt={item.label} height={30} width={130} />
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default MenuList
