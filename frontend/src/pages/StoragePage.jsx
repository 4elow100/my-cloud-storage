import { useEffect, useState } from 'react'
import { ListView } from '../components/views/listView/ListView.jsx'
import { GridView } from '../components/views/gridView/GridView.jsx'
import { CreateItemButton } from '../components/buttons/CreateItemButton.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UploadFileButton } from '../components/buttons/UploadFileButton.jsx'
import { useStorage } from '../providers/storage/useStorage.js'
import { ViewSelector } from '../components/ViewSelector.jsx'
import { FolderPathSequence } from '../components/FolderPathSequence.jsx'

export const StoragePage = () => {
  const { updateFlag, getContent, folderPath, setTargetUserId, storagePath } = useStorage()

  const { user_id } = useParams()
  const navigate = useNavigate()
  const [currentView, setView] = useState('list')
  const location = useLocation()

  useEffect(() => {
    setTargetUserId(user_id)
    const newStoragePath = user_id ? `/storage/users/${user_id}` : '/storage'
    getContent(user_id, data => navigate(`${newStoragePath}/${data.closest_existing_path}`))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, updateFlag])

  const onOpenFolder = folder_name => {
    const newPathSegments = [...folderPath, folder_name]
    navigate(`${storagePath}/${newPathSegments.map(encodeURIComponent).join('/')}`)
  }

  return (
    <>
      <div className="storage-container">
        <header className="storage-header">
          <FolderPathSequence />
          <div className="storage-header-actions">
            <UploadFileButton />
            <CreateItemButton />
            <ViewSelector onChange={view => setView(view)} />
          </div>
        </header>
        <div className="storage-content">
          {currentView === 'list' && <ListView onOpenFolder={onOpenFolder} />}
          {currentView === 'grid' && <GridView onOpenFolder={onOpenFolder} />}
        </div>
      </div>
    </>
  )
}
