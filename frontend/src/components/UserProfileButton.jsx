import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser as noUserIcon} from "@fortawesome/free-regular-svg-icons";
import {faCircleUser as userIcon} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../providers/auth/useAuth.js";

export const UserProfileButton = ({iconOnClick, btnOnClick, btnTitle}) => {
  const {user} = useAuth()

  return (
    <>
      <div className="user-profile-container">
        <button className="user-profile-btn btn" onClick={btnOnClick} type="button">{btnTitle}</button>
        {user ? <FontAwesomeIcon icon={userIcon} className="user-profile-icon btn" onClick={iconOnClick}/> :
          <FontAwesomeIcon icon={noUserIcon} className="user-profile-icon btn" onClick={iconOnClick}/>}
      </div>
    </>
  )
}