import Page404 from "components/pages/404"
import { Route, Routes } from "react-router-dom"
import { publicRoutes, guardedRoutes } from "./routes"
import Product from "components/pages/Product"

const Routings = () => {
  return (
    <Routes>
      {guardedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="/detail/:id" element={<Product />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default Routings
