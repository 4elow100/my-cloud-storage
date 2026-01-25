import { Navigate } from 'react-router-dom'
import { useAuth } from '../../providers/auth/useAuth.js'

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/" replace />
  } else if (!user.is_staff) {
    return <Navigate to="/storage" replace />
  }

  return children
}
