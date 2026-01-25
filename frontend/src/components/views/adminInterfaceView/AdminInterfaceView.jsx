import { useAdmin } from '../../../providers/admin/useAdmin.js'
import { AdminUserRow } from './AdminUserRow.jsx'

export const AdminInterfaceView = () => {
  const { usersList } = useAdmin()

  return (
    <>
      {usersList.map(user => (
        <AdminUserRow key={user.id} item={user} />
      ))}
    </>
  )
}
