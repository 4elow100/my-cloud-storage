import {useEffect, useState} from "react";
import {ListView} from "../components/views/listView/ListView.jsx";
import {GridView} from "../components/views/gridView/GridView.jsx";
import {FileContextMenu} from "../components/contextMenus/FileContextMenu.jsx";
import {FolderContextMenu} from "../components/contextMenus/FolderContextMenu.jsx";
import {CreateItemButton} from "../components/common/CreateItemButton.jsx";
import {CreateFolderModal} from "../components/modals/CreateFolderModal.jsx";
import getCookie from "../utils/getCookie.js";
import {useLocation, useNavigate} from "react-router-dom";
import {UploadFileButton} from "../components/common/UploadFileButton.jsx";
import {UploadFileModal} from "../components/modals/UploadFileModal.jsx";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const StoragePage = () => {
  const navigate = useNavigate()
  const [currentView, setView] = useState('list');
  const [contextMenuType, setContextMenuType] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({left: 0, top: 0});
  const [modalType, setModalType] = useState(null);
  const [storageData, setStorageData] = useState({folders: [], files: []});
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [folderPath, setFolderPath] = useState([])
  const [updateFlag, setUpdateFlag] = useState(false)

  const location = useLocation();


  useEffect(() => {
    const pathSegments = location.pathname.replace('/storage', '').split('/').filter(Boolean)

    let url = `${API_BASE_URL}/storage/folders/`
    if (pathSegments.length > 0) url += `${pathSegments.join('/')}/`

    fetch(url, {
      headers: {"X-CSRFToken": getCookie('csrftoken')},
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.error === 'FOLDER_NOT_FOUND') {
          navigate(`/storage/${data.closest_existing_path}`)
        } else {
          setStorageData(data)
          setCurrentFolderId(data.current_folder_id)
          setFolderPath(pathSegments)
        }
      })
  }, [location.pathname, updateFlag]);

  const onContextMenu = (e) => {
    e.preventDefault()

    if (contextMenuType) setContextMenuType(null)

    setContextMenuPosition({
      left: e.clientX,
      top: e.clientY
    })

    if (e.target.closest(".item-type-file")) {
      setContextMenuType('file')
      return
    }

    if (e.target.closest(".item-type-folder")) {
      setContextMenuType('folder')
    }
  }

  const handleClick = (e) => {
    if (e.target.closest('.storage-row-details')) return

    if (!e.target.closest(".context-menu-container")) {
      setContextMenuType(null)
    }
  }

  const createFolder = async (name) => {
    try {
      await fetch(`${API_BASE_URL}/storage/folders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          parent: currentFolderId
        })
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при создании папки'
              alert(message)
            })
          }
          setModalType(null)
          setUpdateFlag(prev => !prev)
        })
    } catch {
      console.log("error")
    }
  }

  const onOpenFolder = (folder_name) => {
    const newPathSegments = [...folderPath, folder_name]
    navigate(`/storage/${newPathSegments.map(encodeURIComponent).join('/')}`)
  }

  const onDeleteItem = async (e) => {
    e.preventDefault()

    const rowElem = e.target.closest('.item-type-file')

    try {
      await fetch(`${API_BASE_URL}/storage/files/${rowElem.getAttribute('data-id')}`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include"
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при удалении файла'
              alert(message)
            })
          }
          setUpdateFlag(prev => !prev)
        })
    } catch {
      console.log("error")
    }
  }

  const onUploadFile = async (file, comment) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("comment", comment)
    if (currentFolderId) formData.append("folder_id", currentFolderId)

    try {
      const res = await fetch(`${API_BASE_URL}/storage/files/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data.non_field_errors && data.non_field_errors.length > 0
          ? data.non_field_errors[0]
          : "Ошибка при загрузке файла";

        alert(message);
        throw new Error(message);
      }

      setUpdateFlag(prev => !prev)
      setModalType(null)

      alert("Файл загружен");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="storage-container" onClick={handleClick}>
        <header className="storage-header">
          <span className="storage-header-title">Файлы</span>
          <div className="storage-header-actions">
            <UploadFileButton onClick={() => setModalType('uploadFile')}/>
            <CreateItemButton onClick={() => setModalType('createFolder')}/>
            <select className="view-select" name="select storage view"
                    onChange={e => setView(e.target.value)}>
              <option className="view-option" value="list">List</option>
              <option className="view-option" value="grid">Grid</option>
            </select>
          </div>
        </header>
        <div className="storage-content">
          {currentView === 'list' &&
            <ListView onOpenFolder={onOpenFolder} data={storageData} onContextMenu={onContextMenu}
                      onDelete={onDeleteItem}/>}
          {currentView === 'grid' &&
            <GridView onOpenFolder={onOpenFolder} data={storageData} onContextMenu={onContextMenu}
                      onDelete={onDeleteItem}/>}
        </div>
        {contextMenuType === 'file' && (<FileContextMenu style={contextMenuPosition}/>)}
        {contextMenuType === 'folder' && (<FolderContextMenu style={contextMenuPosition}/>)}
      </div>
      {modalType === 'createFolder' && <CreateFolderModal onSubmit={createFolder} onClose={() => setModalType(null)}/>}
      {modalType === 'uploadFile' && <UploadFileModal onSubmit={onUploadFile} onClose={() => setModalType(null)}/>}
    </>
  )
}