import { Search } from "@mui/icons-material"
import { Autocomplete, InputBase, ListItem, ListItemText } from "@mui/material"
import { makeStyles } from "@mui/styles"
import NumberFormat from "components/common/NumberFormat"
import { realtimeDB } from "Firebase/firebaseConfig"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { text } from "stream/consumers"

const useStyles = makeStyles(() => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: 5,
    },
  },
  input: {
    height: 40,
    width: "100%",
    padding: 20,
    paddingRight: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
    lineHeight: 38,
    fontSize: 13,

    // "&.Mui-focused": {
    //   border: "1.5px solid #0C9",
    // },
  },
}))

const SearchSuggestion = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [productList, setProductList] = useState<ICustomAPIResponse[]>([])
  const isLoading = productList.length === 0

  // Effect: get product list
  useEffect(() => {
    realtimeDB.ref("products").once("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setProductList(data)
      }
    })
  }, [])

  // Effect: keyboard ctrl + F shortcut for search
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
        const searchInput = document.getElementById("search")
        if (searchInput !== document.activeElement) {
          e.preventDefault()
          searchInput.focus()
        } else {
          return true
        }
      }
      return undefined
    })
  }, [])

  const handleOnChange = (productId: string) => {
    navigate(`/product/details/${productId}`)
  }

  return (
    <Autocomplete
      value=""
      id="search"
      freeSolo
      loading={isLoading}
      loadingText="Tải tìm kiếm..."
      selectOnFocus
      autoHighlight
      options={productList}
      sx={{ width: { xs: "60%", md: "33%" } }}
      renderOption={(props, option) => (
        <ListItem {...props} dense sx={{ columnGap: 2 }}>
          <div style={{ width: 70, height: 70 }}>
            <img
              src={option.photoImage}
              alt={option.title}
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </div>
          <ListItemText
            style={{ padding: 20 }}
            primaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
            primary={option.title}
            secondary={
              <div>
                {option.promotion.name === "giare" ? (
                  option.promotion.value !== "" ? (
                    <>
                      <NumberFormat
                        value={option.price}
                        color="inherit"
                        TextProps={{
                          fontSize: 14,
                          sx: { textDecoration: "line-through" },
                        }}
                      />
                      <span style={{ color: "#BB161C", fontSize: 16 }}>
                        {option.promotion.value + " ₫"}
                      </span>
                    </>
                  ) : (
                    <NumberFormat value={option.price} color="#BB161C" />
                  )
                ) : (
                  <NumberFormat value={option.price} color="#BB161C" />
                )}
              </div>
            }
          />
        </ListItem>
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title || ""
      }
      onChange={(e, value) => {
        const { productId } = value as ICustomAPIResponse
        productId !== undefined && handleOnChange(productId)
      }}
      renderInput={(params) => {
        return (
          <InputBase
            {...params}
            {...params.InputProps}
            placeholder="Bạn tìm gì..."
            className={classes.input}
            endAdornment={<Search sx={{ cursor: "default" }} />}
          />
        )
      }}
    />
  )
}

export default SearchSuggestion
