import {FolderRow} from "./FolderRow.jsx";
import {FileRow} from "./FileRow.jsx";

export const ListView = ({data, onContextMenu, onDelete, onOpenFolder}) => {
  return (
    <>
      <header className="table-header">
        <span className="col1"></span>
        <div className="table-header-name col2">Название</div>
        <div className="table-header-size col3">Размер</div>
        <div className="table-header-uploaded col4">Дата изменения</div>
        <div className="table-header-downloaded col5">Дата последнего скачивания</div>
        <div className="table-header-comment col6">Комментарий</div>
        <span className="col7"></span>
      </header>
      <div className="table-content">
        {data['folders'].map(item => (
          <FolderRow key={item.id} item={item} onContextMenu={onContextMenu} onDelete={onDelete} onDetails={onContextMenu} onDoubleClick={onOpenFolder}/>
        ))}
        {data['files'].map(item => (
          <FileRow key={item.id} item={item} onContextMenu={onContextMenu} onDelete={onDelete} onDetails={onContextMenu}/>
        ))}
      </div>
    </>
  )
}