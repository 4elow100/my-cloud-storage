import {StorageItem} from "./StorageItem.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/free-solid-svg-icons";

export const FolderStorageItem = ({item, onContextMenu, onDoubleClick}) => {
  const handleDoubleClick = () => {
    onDoubleClick(item.name)
  }

  return (
    <>
      <StorageItem onContextMenu={onContextMenu} elemTypeClass='item-type-folder' onDoubleClick={handleDoubleClick} item_id={item.id}>
          <FontAwesomeIcon icon={faFolder} className="storage-item-icon"/>
          <span className="storage-item-title">{item.name}</span>
      </StorageItem>
    </>
  )
}