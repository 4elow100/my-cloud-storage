import { useStorage } from '../providers/storage/useStorage.js'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useAdmin } from '../providers/admin/useAdmin.js'

export const FolderPathSequence = () => {
  const { getUserInfo } = useAdmin()
  const { isAdminMode, targetUserId } = useStorage()
  const { folderPath, storagePath } = useStorage()
  const navigate = useNavigate()
  const [targetUserName, setTargetUserName] = useState()

  useEffect(() => {
    if (isAdminMode) {
      getUserInfo(targetUserId, data => setTargetUserName(data.username))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminMode, targetUserId])

  const handleClick = e => {
    if (e.target.closest('.storage-header-title')) {
      navigate(storagePath + '/')
      return
    }

    const index = folderPath.findIndex(
      name => name === e.target.closest('.storage-folder-path-name').textContent
    )
    const path = index === -1 ? folderPath.join('/') : folderPath.slice(0, index + 1).join('/')

    navigate(storagePath + '/' + path + '/')
  }

  return (
    <>
      <div className="storage-folder-path-container">
        <div className="storage-header-title btn" onClick={handleClick}>
          {isAdminMode ? `Файлы ${targetUserName}` : 'Ваши файлы'}
        </div>
        {folderPath.map((folder, i) => (
          <React.Fragment key={i}>
            <span>{'>'}</span>
            <div className="storage-folder-path-name btn" onClick={handleClick}>
              {folder}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
