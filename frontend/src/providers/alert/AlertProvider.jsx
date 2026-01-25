import { useState } from 'react'
import { AlertContext } from './AlertContext'
import { MessageAlert } from '../../components/MessageAlert.jsx'

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', color: '' })

  const showAlert = (message, color = 'lightgray', timeout = 2000) => {
    setAlert({ message, color })

    setTimeout(() => {
      setAlert({ message: '', color: '' })
    }, timeout)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && <MessageAlert data={alert} />}
    </AlertContext.Provider>
  )
}
