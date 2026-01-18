import {StorageItem} from "./StorageItem.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {useContextMenu} from "../../../providers/contextMenu/useContextMenu.js";

export const FolderStorageItem = ({item, onDoubleClick}) => {
  const {openContextMenu} = useContextMenu()

  const handleDoubleClick = () => {
    onDoubleClick(item.name)
  }

  const handleContextMenu = (e) => {
    const rowElem = e.target.closest(".item-type-folder")
    rowElem.classList.add("selected")
    openContextMenu(e, item.id, 'folder', rowElem, item.name, 'folders')
  }

  return (
    <>
      <StorageItem onContextMenu={handleContextMenu} elemTypeClass='item-type-folder' onDoubleClick={handleDoubleClick} item_id={item.id}>
          <FontAwesomeIcon icon={faFolder} className="storage-item-icon"/>
          <span className="storage-item-title">{item.name}</span>
      </StorageItem>
    </>
  )
}