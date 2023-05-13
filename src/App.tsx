import Layout from "components/Layouts"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Routings from "router/Routings"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnFocusLoss={false} />
      <Layout>
        <Routings />
      </Layout>
    </BrowserRouter>
  )
}

export default App
