import { ContextMenu } from '../common/ContextMenu.jsx'
import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useModal } from '../../providers/modals/useModal.js'

export const FolderContextMenu = () => {
  const { contextMenuPosition } = useContextMenu()
  const { openModal } = useModal()

  const handleRename = () => {
    openModal('renameItem')
  }

  const handleDetails = () => {
    openModal('details')
  }

  const handleDelete = () => {
    openModal('deleteConfirm')
  }

  return (
    <>
      <ContextMenu style={contextMenuPosition}>
        <div className="context-menu-part">
          <div className="context-menu-option" onClick={handleRename}>
            <FontAwesomeIcon icon={faPencil} />
            <span>Переименовать</span>
          </div>
          <div className="context-menu-option" onClick={handleDetails}>
            <FontAwesomeIcon icon={faInfo} />
            <span>Свойства</span>
          </div>
        </div>
        <div className="context-menu-option" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>Удалить</span>
        </div>
      </ContextMenu>
    </>
  )
}
