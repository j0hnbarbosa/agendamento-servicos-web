import { RouterProvider } from 'react-router-dom'
import routerPaths from '@/routes/routerPaths'

const Routes = () => {
  return (
    <RouterProvider router={routerPaths} />
  )
}

export default Routes