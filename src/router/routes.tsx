import ContactPage from "pages/Contact"
import GuaranteePage from "pages/Guarantee"
import HomePage from "pages/Home"
import IntroPage from "pages/Introduce"
import Login from "pages/Login"
import NewsPage from "pages/News"
import Payment from "pages/Payment"
import Register from "pages/Register"
import type { PathRouteProps } from "react-router-dom"

export const guardedRoutes: Array<PathRouteProps> = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]

export const publicRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/introduce",
    element: <IntroPage />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/guarantee",
    element: <GuaranteePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
]
