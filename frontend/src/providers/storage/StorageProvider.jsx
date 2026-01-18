import {StorageContext} from "./StorageContext.js";
import getCookie from "../../utils/getCookie.js";
import {useState} from "react";
import {useAlert} from "../alert/useAlert.js";
import {useLocation} from "react-router-dom";
import {useModal} from "../modals/useModal.js";
import {useContextMenu} from "../contextMenu/useContextMenu.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const StorageProvider = ({children}) => {
  const {showAlert} = useAlert()
  const {modalType, openModal} = useModal()
  const {contextMenuType, closeContextMenu, currentElemId, currentFileName, currentElemAPILink} =useContextMenu()

  const [updateFlag, setUpdateFlag] = useState(false)
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [storageData, setStorageData] = useState({folders: [], files: []});
  const [folderPath, setFolderPath] = useState([])
  const location = useLocation();

  const getContent = async (folderNotFound) => {
    const pathSegments = location.pathname.replace('/storage', '')
      .split('/').filter(Boolean)

    let url = `${API_BASE_URL}/storage/folders/`
    if (pathSegments.length > 0) url += `${pathSegments.join('/')}/`

    try {
      const res = await fetch(url, {
        headers: {"X-CSRFToken": getCookie('csrftoken')},
        credentials: "include"
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
      folderNotFound({closest_existing_path: ''})
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
              showAlert(message, "red")
            })
          } else {
            setUpdateFlag(prev => !prev)
            showAlert("Папка успешно создана", "green")
            modalType && openModal(null)
            contextMenuType && closeContextMenu()
          }
        })
    } catch {
      console.log("error")
    }
  }


  const uploadFile = async (file, comment) => {
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

        showAlert(message, "red");
        throw new Error(message);
      }

      setUpdateFlag(prev => !prev)
      showAlert("Файл загружен", "green");
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteItem = async () => {
    try {
      await fetch(`${API_BASE_URL}/storage/${currentElemAPILink}/${currentElemId}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include"
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при удалении'                          //TODO: проверить ответ с ошибкой под каким ключом сообщение
              showAlert(message, "red")
            })
          }
          setUpdateFlag(prev => !prev)
          modalType && openModal(null)
          contextMenuType && closeContextMenu()
        })
    } catch {
      console.log("error")
    }
  }

  const downloadFile = async () => {
    const response = await fetch(
      `${API_BASE_URL}/storage/files/${currentElemId}/download/`,
      {
        credentials: "include"
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    modalType && openModal(null)
    contextMenuType && closeContextMenu()
  }

  const renameItem = async (newName) => {
    try {
      await fetch(`${API_BASE_URL}/storage/${currentElemAPILink}/${currentElemId}/rename/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include",
        body: JSON.stringify({
          name: newName
        })
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при переименовании'                    //TODO: проверить ответ с ошибкой под каким ключом сообщение
              showAlert(message, "red")
            })
          }
          setUpdateFlag(prev => !prev)
          modalType && openModal(null)
          contextMenuType && closeContextMenu()
        })
    } catch {
      console.log("error")
    }
  }

  const getShareLink = async (setData) => {
    try {
      await fetch(`${API_BASE_URL}/storage/${currentElemAPILink}/${currentElemId}/get_token/`, {
        method: "GET",
        headers: {
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include"
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при получении данных'                  //TODO: проверить ответ с ошибкой под каким ключом сообщение
              showAlert(message, "red")
            })
          } else {
            res.json().then(data => setData(data))
          }
        })
    } catch {
      console.log("error")
    }
  }

  const getItemInfo = async (setData) => {
    try {
      await fetch(`${API_BASE_URL}/storage/${currentElemAPILink}/${currentElemId}/`, {
        method: "GET",
        headers: {
          "X-CSRFToken": getCookie('csrftoken')
        },
        credentials: "include"
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(data => {
              const message = data["name"] ? data["name"][0] : 'Ошибка при получении данных'                  //TODO: проверить ответ с ошибкой под каким ключом сообщение
              showAlert(message, "red")
            })
          } else {
            res.json().then(data => setData(data))
          }
        })
    } catch {
      console.log("error")
    }
  }

  return (
    <StorageContext.Provider
      value={{getContent, createFolder, uploadFile, deleteItem, downloadFile, getItemInfo,
        updateFlag, setCurrentFolderId, folderPath, storageData, renameItem, getShareLink}}>
      {children}
    </StorageContext.Provider>
  )
}