import { CssBaseline, ThemeProvider } from "@mui/material"
import ReactDOM from "react-dom"
import { ToastContainer } from "react-toastify"
import theme from "styles/theme"
import App from "./App"

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <ToastContainer limit={1} pauseOnFocusLoss={false} />
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
)
