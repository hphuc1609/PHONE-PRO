import ContactPage from "pages/Contact"
import GuaranteePage from "pages/Guarantee"
import HomePage from "pages/Home"
import IntroPage from "pages/Introduce"
import Login from "pages/Login"
import ForgotPassword from "pages/Login/ForgotPassword"
import NewsPage from "pages/News"
import Payment from "pages/Payment"
import Profile from "pages/Profile"
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
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]

export const publicRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/gioi-thieu",
    element: <IntroPage />,
  },
  {
    path: "/tin-tuc",
    element: <NewsPage />,
  },
  {
    path: "/bao-hanh",
    element: <GuaranteePage />,
  },
  {
    path: "/lien-he",
    element: <ContactPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]
