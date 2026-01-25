import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/auth/AuthProvider.jsx'
import { AlertProvider } from './providers/alert/AlertProvider.jsx'
import { ContextMenuProvider } from './providers/contextMenu/ContextMenuProvider.jsx'
import { StorageProvider } from './providers/storage/StorageProvider.jsx'
import { ModalProvider } from './providers/modals/ModalProvider.jsx'
import { AdminProvider } from './providers/admin/AdminProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <AuthProvider>
          <ContextMenuProvider>
            <ModalProvider>
              <StorageProvider>
                <AdminProvider>
                  <App />
                </AdminProvider>
              </StorageProvider>
            </ModalProvider>
          </ContextMenuProvider>
        </AuthProvider>
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>
)
