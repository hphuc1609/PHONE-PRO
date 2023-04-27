import ContactPage from "components/pages/Contact"
import GuaranteePage from "components/pages/Guarantee"
import HomePage from "components/pages/Home"
import IntroPage from "components/pages/Introduce"
import NewsPage from "components/pages/News"
import { PathRouteProps } from "react-router-dom"

export const routes: Array<PathRouteProps> = [
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
]
