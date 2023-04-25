import Home from "components/pages/Home"
import { PathRouteProps } from "react-router-dom"

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  //   {
  //     path: "/about",
  //     element: <IntroPage />,
  //   },
  //   {
  //     path: "/news",
  //     element: <NewsPage />,
  //   },
  //   {
  //     path: "/guarantee",
  //     element: <GuaranteePage />,
  //   },
  //   {
  //     path: "/contact",
  //     element: <ContactPage />,
  //   },
]
