import { Button, Grid, Paper, Typography } from "@mui/material"
import { ICustomAPIResponse } from "models/product"
import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { companies } from "utils/company"

interface Props {
  products: ICustomAPIResponse[]
  setTitle: Dispatch<SetStateAction<string>>
  setIsShowFilter: Dispatch<SetStateAction<boolean>>
  setDataFilter: Dispatch<SetStateAction<ICustomAPIResponse[]>>
}

const MenuList = ({
  products,
  setTitle,
  setIsShowFilter,
  setDataFilter,
}: Props) => {
  const navigate = useNavigate()

  const ShowProductFromBrand = (value: string) => {
    if (value) {
      const filteredProduct = products?.filter(
        (product) => product.company?.toLowerCase() === value.toLowerCase()
      )

      setTitle(value)
      setDataFilter(filteredProduct)
      setIsShowFilter(true)
      navigate(`/brand/${value}`)
    }
    setTimeout(() => window.scroll({ top: 600, behavior: "smooth" }), 300)
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
