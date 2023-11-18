import { Search } from "@mui/icons-material"
import {
  Autocomplete,
  InputBase,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import NumberFormat from "components/common/NumberFormat"
import { realtimeDB } from "Firebase/firebaseConfig"
import { ICustomAPIResponse } from "models/product"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles(() => ({
  input: {
    height: 40,
    width: "100%",
    padding: 20,
    paddingRight: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
    lineHeight: 38,
    fontSize: 13,

    "&.Mui-focused": {
      border: "1.5px solid #0C9",
    },
  },
}))

const SearchSuggestion = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const isLoading = productList.length === 0

  useEffect(() => {
    realtimeDB.ref("products").once("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setProductList(data)
      }
    })
  }, [])

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

  const handleOnChange = (value: ICustomAPIResponse) => {
    if (value.productId) {
      navigate(`/product/details/${value.productId}`)
    }
  }

  return (
    <Autocomplete
      value=""
      id="search"
      freeSolo
      loading={isLoading}
      loadingText="Đang tải..."
      selectOnFocus
      autoHighlight
      options={productList}
      sx={{ width: { xs: "80%", md: "33%" } }}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          component="span"
          dense
          sx={{
            columnGap: 2,
            borderBottom: `1px solid #e8e8e8`,
            "&:last-child": { border: "none" },
          }}
        >
          <div style={{ width: 70, height: 70 }}>
            <img
              src={option.photoImage || "/"}
              alt={option.title}
              width="100%"
              height="100%"
              style={{ objectFit: "revert" }}
            />
          </div>
          <ListItemText
            primary={option.title}
            secondary={<NumberFormat value={option.price} color="#BB161C" />}
          />
        </ListItem>
      )}
      getOptionLabel={(options) => options.title || ""}
      onChange={(e, value) => value !== undefined && handleOnChange(value)}
      renderInput={(params) => {
        return (
          <InputBase
            {...params}
            {...params.InputProps}
            placeholder="Bạn tìm gì..."
            className={classes.input}
            endAdornment={
              <Tooltip arrow title="Ctrl+F" placement="right">
                <Search sx={{ cursor: "default" }} />
              </Tooltip>
            }
          />
        )
      }}
    />
  )
}

export default SearchSuggestion
