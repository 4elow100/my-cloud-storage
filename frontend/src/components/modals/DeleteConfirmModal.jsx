import { useStorage } from '../../providers/storage/useStorage.js'
import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { useAdmin } from '../../providers/admin/useAdmin.js'
import { ConfirmModal } from './ConfirmModal.jsx'
import { useLocation } from 'react-router-dom'

export const DeleteConfirmModal = () => {
  const { currentFileName } = useContextMenu()
  const { deleteItem } = useStorage()
  const { deleteUser } = useAdmin()

  const location = useLocation()

  const handleDelete = () => {
    try {
      location.pathname === '/admin' ? deleteUser() : deleteItem()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ConfirmModal
        message={`Вы уверены, что хотите удалить ${
          location.pathname === '/admin' ? 'пользователя ' : ''
        }
      ${currentFileName}?`}
        callback={handleDelete}
      />
    </>
  )
}
