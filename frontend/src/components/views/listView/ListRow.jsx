import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {getFileIcon} from "../../../utils/getFileIcon.js";


export const ListRow = ({item}) => {
  const itemIcon = item.isFolder ? (faFolder) : (getFileIcon(item.name))

  return (
    <>
      <div className="storage-list-row">
        <FontAwesomeIcon icon={itemIcon} className="storage-item-icon" />
        <div className="storage-row-name btn">{item.name}</div>
        <div className="storage-row-size">{item.size}</div>
        <div className="storage-row-uploaded">{item.uploaded_at}</div>
        <div className="storage-row-downloaded">{item.last_download}</div>
        <div className="storage-row-comment">{item.comment}</div>
        <div className="storage-row-delete btn">🧺</div>
        <div className="storage-row-details btn">...</div>
      </div>
    </>
  )
}