import { BridgeGuardProvider } from '../context/BridgeGuard'
import { RouterProvider } from 'react-router-dom'
import routerPaths from './routerPaths'

const Routes = () => {
  return (
    <BridgeGuardProvider>
      <RouterProvider router={routerPaths} />
    </BridgeGuardProvider>
  )
}

export default Routes