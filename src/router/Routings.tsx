import Page404 from "components/pages/404"
import { Route, Routes } from "react-router-dom"
import { directedRoutes, guardedRoutes } from "./routes"

const Routings = () => {
  return (
    <Routes>
      {guardedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {directedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default Routings
