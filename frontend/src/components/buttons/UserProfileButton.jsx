import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser as noUserIcon } from '@fortawesome/free-regular-svg-icons'
import { faCircleUser as userIcon } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../providers/auth/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export const UserProfileButton = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { openModal } = useModal()

  const handleIconClick = () => {
    user ? navigate('/storage') : openModal('login')
  }

  const handleButtonClick = () => {
    if (user) {
      logout()
    } else {
      openModal('login')
    }
  }

  return (
    <>
      <div className="user-profile-container">
        <Button type="button" onClick={handleButtonClick}>
          {user ? 'Выход' : 'Вход'}
        </Button>
        {user ? (
          <FontAwesomeIcon
            icon={userIcon}
            className="user-profile-icon btn"
            onClick={handleIconClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={noUserIcon}
            className="user-profile-icon btn"
            onClick={handleIconClick}
          />
        )}
      </div>
    </>
  )
}
