import { StorageContext } from './StorageContext.js'
import getCookie from '../../utils/getCookie.js'
import { useState, useMemo } from 'react'
import { useAlert } from '../alert/useAlert.js'
import { useLocation } from 'react-router-dom'
import { useModal } from '../modals/useModal.js'
import { useContextMenu } from '../contextMenu/useContextMenu.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const StorageProvider = ({ children }) => {
  const { showAlert } = useAlert()
  const { modalType, openModal } = useModal()
  const { contextMenuType, closeContextMenu, currentElemId, currentFileName, currentElemAPILink } =
    useContextMenu()

  const [updateFlag, setUpdateFlag] = useState(false)
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [storageData, setStorageData] = useState({ folders: [], files: [] })
  const [folderPath, setFolderPath] = useState([])
  const location = useLocation()

  const [targetUserId, setTargetUserId] = useState(null)

  const isAdminMode = useMemo(() => Boolean(targetUserId), [targetUserId])

  const storageApiUrl = useMemo(() => {
    return isAdminMode ? `/storage/users/${targetUserId}` : '/storage'
  }, [isAdminMode, targetUserId])

  const storagePath = useMemo(() => {
    return isAdminMode ? `/user/${targetUserId}/storage` : '/storage'
  }, [isAdminMode, targetUserId])

  const getContent = async (user_id, folderNotFound) => {
    let newStoragePath = ''
    let newStorageApiUrl = ''

    if (user_id !== targetUserId) {
      newStoragePath = user_id ? `/user/${user_id}/storage` : '/storage'
      newStorageApiUrl = user_id ? `/storage/users/${user_id}` : '/storage'
    } else {
      newStoragePath = storagePath
      newStorageApiUrl = storageApiUrl
    }

    const pathSegments = location.pathname.replace(newStoragePath, '').split('/').filter(Boolean)

    let url = `${API_BASE_URL + newStorageApiUrl}/content/`
    if (pathSegments.length > 0) url += `${pathSegments.join('/')}/`

    try {
      const res = await fetch(url, {
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        credentials: 'include',
      })

      const data = await res.json()

      if (data.error === 'FOLDER_NOT_FOUND') {
        folderNotFound(data)
      } else {
        setStorageData(data)
        setCurrentFolderId(data.current_folder_id)
        setFolderPath(pathSegments)
      }
    } catch (err) {
      console.log(err)
      folderNotFound({ closest_existing_path: '' })
    }
  }

  const createFolder = async name => {
    try {
      const res = await fetch(`${API_BASE_URL + storageApiUrl}/folders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          parent: currentFolderId,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        const message_raw = data['error'] ? data['error'] : 'Ошибка при создании папки'
        const message = message_raw.split(':')[1].trim()
        showAlert(message, 'red')
      } else {
        setUpdateFlag(prev => !prev)
        showAlert('Папка успешно создана', 'green')
        modalType && openModal(null)
        contextMenuType && closeContextMenu()
      }
    } catch {
      console.log('error')
    }
  }

  const uploadFile = async (file, comment) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('comment', comment)
    if (currentFolderId) formData.append('folder_id', currentFolderId)

    try {
      const res = await fetch(`${API_BASE_URL + storageApiUrl}/files/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        const message_raw = data["error"]
          ? data["error"] : 'Ошибка при загрузке файла'
        const message = message_raw.split(':')[1].trim()
        showAlert(message, 'red')
        throw new Error(message)
      }

      setUpdateFlag(prev => !prev)
      showAlert('Файл загружен', 'green')
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteItem = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL + storageApiUrl}/${currentElemAPILink}/${currentElemId}/`,
        {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
          credentials: 'include',
        }
      )

      if (!res.ok) {
        const data = await res.json()
        const message = data['name'] ? data['name'][0] : 'Ошибка при удалении'
        showAlert(message, 'red')
      }
      setUpdateFlag(prev => !prev)
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch {
      console.log('error')
    }
  }

  const downloadFile = async () => {
    const res = await fetch(`${API_BASE_URL + storageApiUrl}/files/${currentElemId}/download/`, {
      credentials: 'include',
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = currentFileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
    setUpdateFlag(prev => !prev)
    modalType && openModal(null)
    contextMenuType && closeContextMenu()
  }

  const renameItem = async newName => {
    try {
      const res = await fetch(
        `${API_BASE_URL + storageApiUrl}/${currentElemAPILink}/${currentElemId}/rename/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
          credentials: 'include',
          body: JSON.stringify({
            name: newName,
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        const message = data['error'] ? data['error'] : 'Ошибка при переименовании'
        showAlert(message, 'red')
        return
      }
      setUpdateFlag(prev => !prev)
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch {
      console.log('error')
    }
  }

  const getShareLink = async setData => {
    try {
      const res = await fetch(
        `${API_BASE_URL + storageApiUrl}/${currentElemAPILink}/${currentElemId}/get_token/`,
        {
          method: 'GET',
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
          credentials: 'include',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        const message = data['name'] ? data['name'][0] : 'Ошибка при получении данных'
        showAlert(message, 'red')
      } else {
        setData(data)
      }
    } catch {
      console.log('error')
    }
  }

  const getItemInfo = async setData => {
    try {
      const res = await fetch(
        `${API_BASE_URL + storageApiUrl}/${currentElemAPILink}/${currentElemId}/`,
        {
          method: 'GET',
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
          credentials: 'include',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        const message = data['name'] ? data['name'][0] : 'Ошибка при получении данных'
        showAlert(message, 'red')
      } else {
        setData(data)
      }
    } catch {
      console.log('error')
    }
  }

  return (
    <StorageContext.Provider
      value={{
        getContent,
        createFolder,
        uploadFile,
        deleteItem,
        downloadFile,
        getItemInfo,
        updateFlag,
        setCurrentFolderId,
        folderPath,
        storageData,
        renameItem,
        getShareLink,
        setUpdateFlag,
        storageApiUrl,
        storagePath,
        setTargetUserId,
        isAdminMode,
        targetUserId,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
