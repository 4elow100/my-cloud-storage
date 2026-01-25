import { ListRow } from './ListRow.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFileIcon } from '../../../utils/getFileIcon.js'
import { faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContextMenu } from '../../../providers/contextMenu/useContextMenu.js'
import { useModal } from '../../../providers/modals/useModal.js'
import { useStorage } from '../../../providers/storage/useStorage.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const FileRow = ({ item }) => {
  const {
    openContextMenu,
    setCurrentFileName,
    setCurrentElemAPILink,
    setCurrentElemId,
    setCurrentElemRef,
  } = useContextMenu()
  const { storageApiUrl } = useStorage()
  const { openModal } = useModal()

  const itemIcon = getFileIcon(item.original_name)

  const handleContextMenu = e => {
    const rowElem = e.target.closest('.item-type-file')
    rowElem.classList.add('selected')
    openContextMenu(e, item.id, 'file', rowElem, item.original_name, 'files')
  }

  const handleDoubleClick = e => {
    e.preventDefault()

    window.open(
      `${API_BASE_URL + storageApiUrl}/files/${item.id}/view/`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleDelete = e => {
    e.preventDefault()

    const elem = e.target.closest('.item-type-file')
    elem.classList.add('selected')
    setCurrentFileName(item.original_name)
    setCurrentElemAPILink('files')
    setCurrentElemId(item.id)
    setCurrentElemRef(elem)
    openModal('deleteConfirm')
  }

  return (
    <>
      <ListRow
        onContextMenu={handleContextMenu}
        elemTypeClass="item-type-file"
        onDoubleClick={handleDoubleClick}
        item_id={item.id}
      >
        <FontAwesomeIcon icon={itemIcon} className="storage-item-icon col1" />
        <div className="storage-row-name col2">{item.original_name}</div>
        <div className="storage-row-size col3">{item.size_formatted}</div>
        <div className="storage-row-uploaded col4">{item.uploaded_at}</div>
        <div className="storage-row-downloaded col5">{item.last_download_at || '-'}</div>
        <div className="storage-row-comment col6">{item.comment || '-'}</div>
        <div className="storage-row-actions col7">
          <div className="storage-row-delete btn" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div className="storage-row-details btn" onClick={handleContextMenu}>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </ListRow>
    </>
  )
}
