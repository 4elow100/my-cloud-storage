import { useEffect } from 'react'
import { useAdmin } from '../providers/admin/useAdmin.js'
import { AdminInterfaceView } from '../components/views/adminInterfaceView/AdminInterfaceView.jsx'

export const AdminPage = () => {
  const { getUsersList, updateFlag } = useAdmin()

  useEffect(() => {
    getUsersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFlag])

  return (
    <div className="admin-container">
      <div className="admin-header-title">Список пользователей</div>
      <header className="admin-header">
        <div className="adm-col1">Логин</div>
        <div className="adm-col2">Почта</div>
        <div className="adm-col3">Имя</div>
        <div className="adm-col4">Фамилия</div>
        <div className="adm-col5">Права админа</div>
        <div className="adm-col6">Кол-во папок</div>
        <div className="adm-col7">Кол-во файлов</div>
        <div className="adm-col8">Общий размер файлов</div>
        <span className="adm-col9"></span>
      </header>
      <div className="admin-content">
        <AdminInterfaceView />
      </div>
    </div>
  )
}
