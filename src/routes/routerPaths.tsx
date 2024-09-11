import { createBrowserRouter } from "react-router-dom"

import App from '@/pages/App'
import ErrorPage from "@/pages/Errors"
import Admin from "@/pages/Admin"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import AvailableTime from "@/pages/AvailableTime"
import Home from "@/pages/Home"
import WorkType from "@/pages/WorkType"
import { BridgeGuardProvider } from "@/context/BridgeGuard"
import Users from "@/pages/Users"

const routerPaths = createBrowserRouter([
  {
    element: (
      <BridgeGuardProvider>
        <App />
      </BridgeGuardProvider>
    ),
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