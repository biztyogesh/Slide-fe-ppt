import Loading from 'components/Loading'
import { Navigate } from 'react-router-dom'
import { URLRoutes } from 'URLRoutes'
export const ProtectedRoute = ({ children, isAllowed, isFetching }: any) => {
  if(isFetching) {
    return <Loading isGlobal/>
  } else if (!isAllowed) {
    return <Navigate to={URLRoutes.clients.notAllowed } replace />
  } else {
    return children
  }
}