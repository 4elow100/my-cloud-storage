import { StorageItem } from './StorageItem.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFileIcon } from '../../../utils/getFileIcon.js'
import { useContextMenu } from '../../../providers/contextMenu/useContextMenu.js'
import { useStorage } from '../../../providers/storage/useStorage.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const FileStorageItem = ({ item }) => {
  const { storageApiUrl } = useStorage()
  const { openContextMenu } = useContextMenu()

  const itemIcon = getFileIcon(item.original_name)

  const handleDoubleClick = () => {
    window.open(
      `${API_BASE_URL + storageApiUrl}/files/${item.id}/view/`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleContextMenu = e => {
    const rowElem = e.target.closest('.item-type-file')
    rowElem.classList.add('selected')
    openContextMenu(e, item.id, 'file', rowElem, item.original_name, 'files')
  }

  return (
    <>
      <StorageItem
        onContextMenu={handleContextMenu}
        elemTypeClass="item-type-file"
        onDoubleClick={handleDoubleClick}
        item_id={item.id}
      >
        <FontAwesomeIcon icon={itemIcon} className="storage-item-icon" />
        <span className="storage-item-title">{item.original_name}</span>
      </StorageItem>
    </>
  )
}
