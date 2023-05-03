import { CssBaseline, ThemeProvider } from "@mui/material"
import ReactDOM from "react-dom"
import theme from "styles/theme"
import App from "./App"

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
)
