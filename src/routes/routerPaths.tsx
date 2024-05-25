import {
  createBrowserRouter
} from "react-router-dom"

import App from '../pages/index/App'
import ErrorPage from "../pages/Errors/default"
import Admin from "../pages/Admin/Admin"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import AvailableTime from "../pages/AvailableTime"
import Home from "../pages/Home"
import WorkType from "../pages/WorkType"

const routerPaths = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin",
        element: <Admin />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/availableTime",
        element: <AvailableTime />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/workType",
        element: <WorkType />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
    ]
  }
])

export default routerPaths