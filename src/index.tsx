import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { ToastContainer } from "react-toastify"
import theme from "styles/theme"
import App from "./App"

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ToastContainer limit={1} pauseOnFocusLoss={false} />
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
)

