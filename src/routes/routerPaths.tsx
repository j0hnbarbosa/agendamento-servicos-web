import { createBrowserRouter } from "react-router-dom"

import App from '@/pages/App'
import ErrorPage from "@/pages/Errors"
import Admin from "@/pages/Admin"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Home from "@/pages/Home"
import WorkType from "@/pages/WorkType"
import { BridgeGuardProvider } from "@/context/BridgeGuard"

const { VITE_BASE_URL } = import.meta.env

const initBasePATH = () => {
  const basePATH = VITE_BASE_URL

  return createBrowserRouter([
    {
      element: (
        <BridgeGuardProvider>
          <App />
        </BridgeGuardProvider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: `${basePATH}/`,
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: `${basePATH}/admin`,
          element: <Admin />,
          errorElement: <ErrorPage />,
        },
        {
          path: `${basePATH}/workType`,
          element: <WorkType />,
          errorElement: <ErrorPage />,
        },
        {
          path: `${basePATH}/login`,
          element: <Login />,
          errorElement: <ErrorPage />,
        },
        {
          path: `${basePATH}/signup`,
          element: <Signup />,
          errorElement: <ErrorPage />,
        },
      ]
    }
  ])
}

const routerPaths = initBasePATH()

export default routerPaths