import { useContext } from 'react'
import { AdminContext } from './AdminContext.js'

export const useAdmin = () => {
  const context = useContext(AdminContext)

  if (!context) {
    throw new Error('useAdmin должен использоваться внутри AdminProvider')
  }

  return context
}
