import {StorageItem} from "./StorageItem.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getFileIcon} from "../../../utils/getFileIcon.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const FileStorageItem = ({item, onContextMenu, onDelete}) => {
  const itemIcon = getFileIcon(item.original_name)

  const handleDoubleClick = () => {
    window.open(`${API_BASE_URL}/storage/files/${item.id}/view`, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <StorageItem onContextMenu={onContextMenu} elemTypeClass='item-type-file' onDoubleClick={handleDoubleClick} item_id={item.id}>
          <FontAwesomeIcon icon={itemIcon} className="storage-item-icon"/>
          <span className="storage-item-title">{item.original_name}</span>
      </StorageItem>
    </>
  )
}