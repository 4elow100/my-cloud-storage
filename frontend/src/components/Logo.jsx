import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

export const Logo = () => {
  const navigate = useNavigate()

  const handleClick = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <>
      <div className="header-logo btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faCloud} className="header-cloud-icon" />
        <span className="header-app-name">My Cloud</span>
      </div>
    </>
  )
}
