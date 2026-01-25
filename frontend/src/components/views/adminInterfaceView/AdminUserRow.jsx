import { useContextMenu } from '../../../providers/contextMenu/useContextMenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

export const AdminUserRow = ({ item }) => {
  const { openContextMenu } = useContextMenu()

  const handleContextMenu = e => {
    const rowElem = e.target.closest('.admin-user-row')
    rowElem.classList.add('selected')
    openContextMenu(e, item.id, 'admin', rowElem, item.username, 'admin_interface')
  }

  return (
    <div
      className="admin-user-row"
      onContextMenu={handleContextMenu}
      data-is_staff={item['is_staff']}
    >
      <div className="adm-col1">{item.username}</div>
      <div className="adm-col2">{item.email}</div>
      <div className="adm-col3">{item.first_name}</div>
      <div className="adm-col4">{item.last_name}</div>
      <div className="adm-col5">{item.is_staff ? 'Есть' : 'Нет'}</div>
      <div className="adm-col6">{item.folders_count}</div>
      <div className="adm-col7">{item.files_count}</div>
      <div className="adm-col8">{item.files_size}</div>
      <div className="adm-col9">
        <div className="storage-row-details btn" onClick={handleContextMenu}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
    </div>
  )
}
