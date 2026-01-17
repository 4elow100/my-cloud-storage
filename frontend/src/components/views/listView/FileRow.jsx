import {ListRow} from "./ListRow.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getFileIcon} from "../../../utils/getFileIcon.js";
import {faEllipsis, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const FileRow = ({item, onContextMenu, onDelete, onDetails}) => {
  const itemIcon = getFileIcon(item.original_name)

  const handleDoubleClick = () => {
    window.open(`${API_BASE_URL}/storage/files/${item.id}/view`, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <ListRow onContextMenu={onContextMenu} elemTypeClass='item-type-file' onDoubleClick={handleDoubleClick}
               item_id={item.id}>
        <FontAwesomeIcon icon={itemIcon} className="storage-item-icon col1"/>
        <div className="storage-row-name btn col2">{item.original_name}</div>
        <div className="storage-row-size col3">{item.size_formatted}</div>
        <div className="storage-row-uploaded col4">{item.uploaded_at}</div>
        <div className="storage-row-downloaded col5">{item.last_download_at || "-"}</div>
        <div className="storage-row-comment col6">{item.comment || "-"}</div>
        <div className="storage-row-actions col7">
          <div className="storage-row-delete btn" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div className="storage-row-details btn" onClick={onDetails}>
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </ListRow>
    </>
  )
}