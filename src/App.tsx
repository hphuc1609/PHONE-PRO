import Layout from "components/layouts"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Routings from "router/Routings"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer limit={1} pauseOnFocusLoss={false} />
      <Layout>
        <Routings />
      </Layout>
    </BrowserRouter>
  )
}

export default App
