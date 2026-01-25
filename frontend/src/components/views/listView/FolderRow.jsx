import { ListRow } from './ListRow.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faFolder, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContextMenu } from '../../../providers/contextMenu/useContextMenu.js'
import { useModal } from '../../../providers/modals/useModal.js'
import { useStorage } from '../../../providers/storage/useStorage.js'
import { useNavigate } from 'react-router-dom'

export const FolderRow = ({ item }) => {
  const {
    openContextMenu,
    setCurrentFileName,
    setCurrentElemAPILink,
    setCurrentElemId,
    setCurrentElemRef,
  } = useContextMenu()
  const { openModal } = useModal()
  const { folderPath, storagePath } = useStorage()

  const navigate = useNavigate()

  const handleContextMenu = e => {
    const rowElem = e.target.closest('.item-type-folder')
    rowElem.classList.add('selected')
    openContextMenu(e, item.id, 'folder', rowElem, item.name, 'folders')
  }

  const handleDoubleClick = () => {
    const newPathSegments = [...folderPath, item.name]
    navigate(`${storagePath}/${newPathSegments.map(encodeURIComponent).join('/')}`)
  }

  const handleDelete = e => {
    e.preventDefault()

    const elem = e.target.closest('.item-type-folder')
    elem.classList.add('selected')
    setCurrentFileName(item.name)
    setCurrentElemAPILink('folders')
    setCurrentElemId(item.id)
    setCurrentElemRef(elem)
    openModal('deleteConfirm')
  }

  return (
    <>
      <ListRow
        onContextMenu={handleContextMenu}
        elemTypeClass="item-type-folder"
        onDoubleClick={handleDoubleClick}
        item_id={item.id}
      >
        <FontAwesomeIcon icon={faFolder} className="storage-item-icon col1" />
        <div className="storage-row-name col2">{item.name}</div>
        <div className="storage-row-size col3">-</div>
        <div className="storage-row-uploaded col4">{item.created_at}</div>
        <div className="storage-row-downloaded col5">-</div>
        <div className="storage-row-comment col6">-</div>
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
