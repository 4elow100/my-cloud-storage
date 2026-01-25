import './App.css'
import { MainHeader } from '../components/MainHeader.jsx'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../components/common/RequireAuth.jsx'
import RequireAdmin from '../components/common/RequireAdmin.jsx'
import { HomePage } from '../pages/HomePage.jsx'
import { StoragePage } from '../pages/StoragePage.jsx'
import { useContextMenu } from '../providers/contextMenu/useContextMenu.js'
import { ModalsList } from '../components/ModalsList.jsx'
import { ContextMenusList } from '../components/ContextMenusList.jsx'
import { useModal } from '../providers/modals/useModal.js'
import { AdminPage } from '../pages/AdminPage.jsx'

function App() {
  const { closeContextMenu, contextMenuType } = useContextMenu()
  const { modalType, openModal } = useModal()

  const handleClick = e => {
    if (!e.target.closest('.context-menu-container') && contextMenuType) {
      closeContextMenu()
      return
    }
    if (modalType && !e.target.closest('.modal')) {
      openModal(null)
    }
  }

  return (
    <div className="app" onClick={handleClick}>
      <header className="header-container">
        <MainHeader />
      </header>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/storage/*"
            element={
              <RequireAuth>
                <StoragePage />
              </RequireAuth>
            }
          />
          <Route
            path="/user/:user_id/storage/*"
            element={
              <RequireAdmin>
                <StoragePage />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage />
              </RequireAdmin>
            }
          />
        </Routes>
      </main>

      <ContextMenusList />
      <ModalsList />
    </div>
  )
}

export default App
