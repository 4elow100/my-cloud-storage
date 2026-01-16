import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud} from "@fortawesome/free-regular-svg-icons";

export const Logo = ({onClick}) => {

  const handleClick = (e) => {
    e.preventDefault()
    onClick()
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