import {FolderStorageItem} from "./FolderStorageItem.jsx";
import {FileStorageItem} from "./FileStorageItem.jsx";
import {useStorage} from "../../../providers/storage/useStorage.js";

export const GridView = ({onOpenFolder}) => {
  const {storageData} = useStorage()

  return (
    <>
      <div className="grid-content custom-context-menu">
        {storageData['folders'].map(item => (
          <FolderStorageItem key={item.id} item={item} onDoubleClick={onOpenFolder}/>
        ))}
        {storageData['files'].map(item => (
          <FileStorageItem key={item.id} item={item} />
        ))}

      </div>
    </>
  )
}