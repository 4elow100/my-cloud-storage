import {ListRow} from "./ListRow.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faFolder, faTrashCan} from "@fortawesome/free-solid-svg-icons";

export const FolderRow = ({item, onContextMenu, onDelete, onDetails, onDoubleClick}) => {

  const handleDoubleClick = () => {
    onDoubleClick(item.name)
  }

  return (
    <>
      <ListRow onContextMenu={onContextMenu} elemTypeClass='item-type-folder' onDoubleClick={handleDoubleClick}
               item_id={item.id}>
        <FontAwesomeIcon icon={faFolder} className="storage-item-icon col1"/>
        <div className="storage-row-name btn col2">{item.name}</div>
        <div className="storage-row-size col3">-</div>
        <div className="storage-row-uploaded col4">{item.created_at}</div>
        <div className="storage-row-downloaded col5">-</div>
        <div className="storage-row-comment col6">-</div>
        <div className="storage-row-actions col7">
          <div className="storage-row-delete btn" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashCan}/>
          </div>
          <div className="storage-row-details btn" onClick={onDetails}>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </ListRow>
    </>
  )
}