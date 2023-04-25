import Page404 from "components/pages/404"
import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"

const Routing = () => {
  return (
    <Routes>
      {routes?.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default Routing
