import { ContextMenu } from '../common/ContextMenu.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpFromBracket,
  faDownload,
  faInfo,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { useStorage } from '../../providers/storage/useStorage.js'
import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { useModal } from '../../providers/modals/useModal.js'
import { useAlert } from '../../providers/alert/useAlert.js'

export const FileContextMenu = () => {
  const { downloadFile, getShareLink } = useStorage()
  const { contextMenuPosition, closeContextMenu } = useContextMenu()
  const { openModal } = useModal()
  const { showAlert } = useAlert()

  const copyToClipboard = text => {
    navigator.clipboard
      .writeText(text)
      .then(() => showAlert('Ссылка скопирована', 'green'))
      .catch(() => showAlert('Не удалось скопировать ссылку', 'red'))
      .finally(closeContextMenu)
  }

  const handleShare = () => {
    getShareLink(data => copyToClipboard(window.location.origin + '/' + data.token + '/'))
  }

  const handleDownload = () => {
    downloadFile()
  }

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
          <div className="context-menu-option" onClick={handleShare}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span>Поделиться</span>
          </div>
        </div>
        <div className="context-menu-part">
          <div className="context-menu-option" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} />
            <span>Скачать</span>
          </div>
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
