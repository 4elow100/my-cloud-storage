import {useEffect, useState} from "react";
import {ListView} from "../components/views/listView/ListView.jsx";
import {GridView} from "../components/views/gridView/GridView.jsx";
import {CreateItemButton} from "../components/common/CreateItemButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {UploadFileButton} from "../components/common/UploadFileButton.jsx";
import {useStorage} from "../providers/storage/useStorage.js";
import {ViewSelector} from "../components/common/ViewSelector.jsx";


export const StoragePage = () => {
  const {updateFlag, getContent, folderPath} = useStorage()

  const navigate = useNavigate()
  const [currentView, setView] = useState('list');
  const location = useLocation();

  useEffect(() => {
    getContent((data) => navigate(`/storage/${data.closest_existing_path}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, updateFlag]);

  const onOpenFolder = (folder_name) => {
    const newPathSegments = [...folderPath, folder_name]
    navigate(`/storage/${newPathSegments.map(encodeURIComponent).join('/')}`)
  }

  return (
    <>
      <div className="storage-container">
        <header className="storage-header">
          <span className="storage-header-title">Файлы</span>
          <div className="storage-header-actions">
            <UploadFileButton />
            <CreateItemButton />
            <ViewSelector onChange={(view) => setView(view)}/>
          </div>
        </header>
        <div className="storage-content">
          {currentView === 'list' &&
            <ListView onOpenFolder={onOpenFolder} />}
          {currentView === 'grid' &&
            <GridView onOpenFolder={onOpenFolder} />}
        </div>

      </div>

    </>
  )
}