import Layout from "components/Layouts"
import { BrowserRouter } from "react-router-dom"
import Routings from "router/Routings"

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routings />
      </Layout>
    </BrowserRouter>
  )
}

export default App

