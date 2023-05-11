import { CssBaseline, ThemeProvider } from "@mui/material"
import ReactDOM from "react-dom"
import theme from "styles/theme"
import App from "./App"
import { CartProvider } from "react-use-cart"

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>,
  document.getElementById("root")
)
