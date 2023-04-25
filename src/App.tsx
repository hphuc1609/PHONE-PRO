import Layout from "components/Layouts"
import { BrowserRouter } from "react-router-dom"
import Routing from "router/routing"

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routing />
      </Layout>
    </BrowserRouter>
  )
}

export default App

