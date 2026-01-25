import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { useAdmin } from '../../providers/admin/useAdmin.js'
import { ConfirmModal } from './ConfirmModal.jsx'

export const ChangeIsStaffModal = () => {
  const { currentFileName, currentElemRef } = useContextMenu()
  const { changeIsStaff } = useAdmin()

  const handleChangeIsStaff = () => {
    try {
      const is_staff = currentElemRef.getAttribute('data-is_staff') === 'true'
      changeIsStaff(!is_staff)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ConfirmModal
        message={`Вы уверены, что хотите ${
          currentElemRef.getAttribute('data-is_staff') === 'true'
            ? 'снять права администратора с пользователя'
            : 'выдать права администратора пользователю'
        } ${currentFileName}?`}
        callback={handleChangeIsStaff}
      />
    </>
  )
}
