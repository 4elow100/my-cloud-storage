import { StorageItem } from './StorageItem.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { useContextMenu } from '../../../providers/contextMenu/useContextMenu.js'
import { useStorage } from '../../../providers/storage/useStorage.js'
import { useNavigate } from 'react-router-dom'

export const FolderStorageItem = ({ item }) => {
  const { openContextMenu } = useContextMenu()
  const { folderPath, storagePath } = useStorage()

  const navigate = useNavigate()

  const handleDoubleClick = () => {
    const newPathSegments = [...folderPath, item.name]
    navigate(`${storagePath}/${newPathSegments.map(encodeURIComponent).join('/')}`)
  }

  const handleContextMenu = e => {
    const rowElem = e.target.closest('.item-type-folder')
    rowElem.classList.add('selected')
    openContextMenu(e, item.id, 'folder', rowElem, item.name, 'folders')
  }

  return (
    <>
      <StorageItem
        onContextMenu={handleContextMenu}
        elemTypeClass="item-type-folder"
        onDoubleClick={handleDoubleClick}
        item_id={item.id}
      >
        <FontAwesomeIcon icon={faFolder} className="storage-item-icon" />
        <span className="storage-item-title">{item.name}</span>
      </StorageItem>
    </>
  )
}
