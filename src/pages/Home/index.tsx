import { yupResolver } from "@hookform/resolvers/yup"
import { makeStyles } from "@mui/styles"
import { realtimeDB } from "Firebase/firebaseConfig"
import BannerSwipe from "components/Banner"
import LoadingWithDots from "components/Loading"
import { toastConfig } from "configs/toast"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { primaryDark } from "styles/config"
import "swiper/css"
import "swiper/css/navigation"
import * as yup from "yup"
import HomeFilter from "./HomeFilter"
import HomeProduct from "./HomeProduct"
import MenuList from "./MenuList"
import "./style.css"
import TableProduct from "pages/ProductBrandPage/TableProduct"

const useStyles = makeStyles(() => ({
  title: {
    textTransform: "capitalize",
    padding: 8,
    borderRadius: 100,
    textAlign: "center",
    color: "white",
    backgroundImage: `linear-gradient(to right, #3977ce, ${primaryDark})`,
    transform: "translateY(-1.05em)",
  },
  root: {
    border: "2px solid #3977ce",
    marginTop: 64,
  },
}))

const HomePage = () => {
  const classes = useStyles()
  const schema = yup.object().shape({
    price: yup.string(),
    promotion: yup.string(),
    starCount: yup.string(),
  })

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: "",
      promotion: "",
      starCount: "",
    },
  })

  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  const [showLoading, setShowLoading] = useState(false)
  const [isShowFilter, setIsShowFilter] = useState(false)
  const [brand, setBrand] = useState("")
  const [dataFilter, setDataFilter] = useState([])

  // Effect: get product list
  useEffect(() => {
    setShowLoading(true)
    realtimeDB
      .ref("products")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          setProductList(data)
        } else {
          throw new Error("No data available!")
        }
      })
      .catch((error) => {
        toast.error(error.message, toastConfig)
      })
      .finally(() => {
        setShowLoading(false)
      })
  }, [])

  const handleClickFilter = (valueFilter: FieldValues) => {
    const filteredProducts = productList.filter((product) => {
      const priceMatch = (() => {
        if (!valueFilter?.price) return true

        switch (valueFilter.price) {
          case "Dưới 2 triệu":
            return product.price < 2000000
          case "Từ 2 - 4 triệu":
            return product.price >= 2000000 && product.price < 4000000
          case "Từ 4 - 7 triệu":
            return product.price >= 4000000 && product.price < 7000000
          default:
            return false
        }
      })()

      const promotionMatch = (() => {
        if (!valueFilter?.promotion) return true

        switch (valueFilter.promotion) {
          case "Giảm giá":
            return product.promotion.name?.toLowerCase() === "giamgia"
          case "Mới ra mắt":
            return product.promotion.name?.toLowerCase() === "moiramat"
          case "Trả góp":
            return product.promotion.name?.toLowerCase() === "tragop"
          case "Giá rẻ online":
            return product.promotion.name?.toLowerCase() === "giare"
          default:
            return false
        }
      })()

      const starCountMatch = (() => {
        if (!valueFilter?.starCount) return true

        switch (valueFilter.starCount) {
          case "Dưới 2 sao":
            return product.star > 0 && product.star <= 2
          case "Từ 3 - 4 sao":
            return product.star > 2 && product.star <= 4
          case "Trên 4 sao":
            return product.star > 4
          default:
            return false
        }
      })()

      return priceMatch && promotionMatch && starCountMatch
    })

    setDataFilter(filteredProducts)
    setIsShowFilter(true)
    setBrand("")
  }

  const handleClearFilter = () => {
    setIsShowFilter(false)
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Phone Pro - Thế giới điện thoại</title>
        <meta name="description" content="Description of HomePage ..." />
      </Helmet>

      {!showLoading ? (
        <>
          <BannerSwipe />
          {/* List Brand */}
          <MenuList
            products={productList}
            setTitle={setBrand}
            setIsShowFilter={setIsShowFilter}
            setDataFilter={setDataFilter}
          />
          {/* Filters */}
          <HomeFilter
            control={control}
            isDirty={isDirty}
            handleClickFilter={handleSubmit(handleClickFilter)}
            handleClearFilter={handleClearFilter}
          />
          {/* Show list product */}
          {isShowFilter ? (
            <div style={{ marginTop: 32 }}>
              <TableProduct
                data={dataFilter}
                title={brand ? `Điện thoại ${brand}` : "Sản phẩm lọc"}
                row={dataFilter?.length}
              />
            </div>
          ) : (
            <HomeProduct productList={productList} />
          )}
        </>
      ) : (
        <LoadingWithDots />
      )}
    </>
  )
}

export default HomePage
