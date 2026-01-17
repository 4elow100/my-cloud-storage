import {FolderStorageItem} from "./FolderStorageItem.jsx";
import {FileStorageItem} from "./FileStorageItem.jsx";

export const GridView = ({data, onContextMenu, onOpenFolder, onDelete}) => {
  return (
    <>
      <div className="grid-content">
        {data['folders'].map(item => (
          <FolderStorageItem key={item.id} item={item} onContextMenu={onContextMenu} onDoubleClick={onOpenFolder}/>
        ))}
        {data['files'].map(item => (
          <FileStorageItem key={item.id} item={item} onContextMenu={onContextMenu} onDelete={onDelete}/>
        ))}

      </div>
    </>
  )
}