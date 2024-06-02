import { KeyboardArrowLeft } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"
import { realtimeDB } from "Firebase/firebaseConfig"
import LoadingWithDots from "components/Loading"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import TableProduct from "./TableProduct"

const ProductBrandPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = location.pathname.split("/")

  const [showLoading, setShowLoading] = useState(false)
  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  // const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setShowLoading(true)
    realtimeDB
      .ref("products")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          setProductList(data)
        } else {
          toast.error("No data available!", toastConfig)
        }
      })
      .finally(() => {
        setShowLoading(false)
      })
  }, [])

  const handleBackHome = () => {
    navigate("/")
  }

  const filteredProduct = useMemo(
    () =>
      productList.filter(
        (product) => product.company.toLowerCase() === params[3]
      ),
    [productList, params]
  )

  // const productsPerPage = 5
  // const totalProducts = filteredProduct.length
  // const totalPages = Math.ceil(totalProducts / productsPerPage)

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setCurrentPage(value)
  // }

  // const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  return (
    <>
      {showLoading ? (
        <LoadingWithDots />
      ) : (
        <>
          <Button
            variant="text"
            onClick={handleBackHome}
            color="inherit"
            sx={{
              fontWeight: 400,
              textTransform: "none",
              padding: "0",
              marginBottom: "1rem",
              fontSize: "1rem",
            }}
          >
            <KeyboardArrowLeft fontSize="small" />
            Trở về trang chủ
          </Button>
          <Grid container>
            <Grid item xs={12}>
              <TableProduct
                data={filteredProduct}
                title={`Điện thoại ${filteredProduct[0]?.company}`}
                row={filteredProduct?.length}
              />
            </Grid>
            {/* <Grid item xs={12} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Grid> */}
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductBrandPage
