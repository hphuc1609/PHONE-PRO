import Page404 from "pages/404"
import HomePage from "pages/Home"
import Product from "pages/Product"
import { Route, Routes } from "react-router-dom"
import { guardedRoutes, publicRoutes } from "./routes"

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
      <Route path="/brand/:id" element={<HomePage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default Routings
