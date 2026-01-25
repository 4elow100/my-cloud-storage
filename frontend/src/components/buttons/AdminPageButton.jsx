import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../common/Button.jsx'
import { useMemo } from 'react'

export const AdminPageButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isAdminPage = useMemo(() => location.pathname === '/admin', [location.pathname])

  const handleClick = () => {
    isAdminPage ? navigate(`/storage`) : navigate(`/admin`)
  }

  return (
    <>
      <Button type="button" onClick={handleClick}>
        {isAdminPage ? 'Ваше хранилище' : 'Интерфейс администратора'}
      </Button>
    </>
  )
}
