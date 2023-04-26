import { Search } from "@mui/icons-material"
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"

interface Props {
  setSearchQuery: (searchQuery: string) => void
}

const SearchSuggest = ({ setSearchQuery }: Props) => {
  // const keyWords = ["Samsung", "Iphone", "Huawei", "Oppo"]

  const handleSearchSuggest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <Box flexGrow={1} textAlign="center">
      <TextField
        id="search-bar"
        onChange={handleSearchSuggest}
        placeholder="Tìm kiếm sản phẩm..."
        variant="outlined"
        size="small"
        sx={{
          width: "50%",
          bgcolor: "white",
          borderRadius: "5px",

          "& .MuiOutlinedInput-root": {
            padding: "0 5px",
            outline: "none",
            "& fieldset": {
              borderColor: "transparent",
              border: "none",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <Grid
        container
        display={{ xs: "none", md: "flex" }}
        width="50%"
        margin="8px auto 0"
      >
        <Grid item xs={12} display="flex">
          <Typography mr={1}>Từ khóa:</Typography>
          {keyWords.map((key, index) => (
            <Grid
              item
              xs={0}
              key={index}
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <Link
                to=""
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 10,
                }}
              >
                {key}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default SearchSuggest
