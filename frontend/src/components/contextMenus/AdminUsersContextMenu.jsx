import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ContextMenu } from '../common/ContextMenu.jsx'
import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../providers/modals/useModal.js'

export const AdminUsersContextMenu = () => {
  const { contextMenuPosition, currentElemId, closeContextMenu, currentElemRef } = useContextMenu()
  const { openModal } = useModal()

  const navigate = useNavigate()

  const handleGoToStorage = () => {
    navigate(`/user/${currentElemId}/storage/`)
    closeContextMenu()
  }

  const handleChangeIsStaff = () => {
    openModal('changeIsStaff')
  }

  const handleDeleteUser = () => {
    openModal('deleteConfirm')
  }

  return (
    <>
      <ContextMenu style={contextMenuPosition}>
        <div className="context-menu-part">
          <div className="context-menu-option" onClick={handleGoToStorage}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span>Хранилище</span>
          </div>
          <div className="context-menu-option" onClick={handleChangeIsStaff}>
            <FontAwesomeIcon icon={faPencil} />
            <span>
              {currentElemRef.getAttribute('data-is_staff') === 'true'
                ? 'Снять адм. права'
                : 'Выдать адм. права'}
            </span>
          </div>
        </div>
        <div className="context-menu-option" onClick={handleDeleteUser}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>Удалить</span>
        </div>
      </ContextMenu>
    </>
  )
}
