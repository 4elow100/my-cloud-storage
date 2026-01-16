import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";

export const UserProfileButton = ({iconOnClick, btnOnClick, btnTitle}) => {
    return (
        <>
            <div className="user-profile-container btn" >
                <div className="user-profile-btn" onClick={btnOnClick}>{btnTitle}</div>
                <FontAwesomeIcon icon={faCircleUser} className="user-profile-icon" onClick={iconOnClick}/>
            </div>
        </>
    )
}