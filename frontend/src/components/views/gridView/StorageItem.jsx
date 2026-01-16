import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {getFileIcon} from "../../../utils/getFileIcon.js";

export const StorageItem = ({item, onContextMenu, isFolder}) => {
  const itemIcon = item.isFolder ? (faFolder) : (getFileIcon(item.name))

  return (
    <>
      <div className={`storage-item btn ${isFolder ? 'item-type-folder' : 'item-type-file'}`}
           onContextMenu={onContextMenu}>
        <FontAwesomeIcon icon={itemIcon} className="storage-item-icon"/>
        <span className="storage-item-title">{item.name}</span>
      </div>
    </>
  )
}