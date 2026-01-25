import { AdminContext } from './AdminContext.js'
import getCookie from '../../utils/getCookie.js'
import { useState } from 'react'
import { useContextMenu } from '../contextMenu/useContextMenu.js'
import { useAlert } from '../alert/useAlert.js'
import { useModal } from '../modals/useModal.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AdminProvider = ({ children }) => {
  const { currentElemId, contextMenuType, closeContextMenu } = useContextMenu()
  const { modalType, openModal } = useModal()
  const { showAlert } = useAlert()

  const [usersList, setUsersList] = useState([])
  const [updateFlag, setUpdateFlag] = useState(false)

  const getUserInfo = async (user_id, callback) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/admin_interface/${user_id}/`, {
        method: 'GET',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      })

      const data = await res.json()

      callback(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getUsersList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/admin_interface/`, {
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        credentials: 'include',
      })

      const data = await res.json()

      setUsersList(data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/admin_interface/${currentElemId}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
      })

      if (!res.ok) {
        const data = await res.json()
        const message = data['error'] ? data['error'][0] : 'Ошибка при удалении пользователя'
        showAlert(message, 'red')
      }
      setUpdateFlag(prev => !prev)
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch {
      console.log('error')
    }
  }

  const changeIsStaff = async target_is_staff => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/admin_interface/${currentElemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({
          is_staff: target_is_staff,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        const message = data['error']
          ? data['error'][0]
          : 'Ошибка при изменении прав администратора'
        showAlert(message, 'red')
      }
      setUpdateFlag(prev => !prev)
      modalType && openModal(null)
      contextMenuType && closeContextMenu()
    } catch {
      console.log('error')
    }
  }

  return (
    <AdminContext.Provider
      value={{ getUsersList, deleteUser, changeIsStaff, usersList, updateFlag, getUserInfo }}
    >
      {children}
    </AdminContext.Provider>
  )
}
