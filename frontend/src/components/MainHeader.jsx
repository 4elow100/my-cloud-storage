import {useAuth} from "../hooks/useAuth.js";
import {Logo} from "./Logo.jsx";
import {useNavigate} from "react-router-dom";
import {UploadFileButton} from "./common/UploadFileButton.jsx";
import {SearchField} from "./SearchField.jsx";
import {UserProfileButton} from "./UserProfileButton.jsx";
import {useState} from "react";
import RegistrationModal from "./modals/RegistrationModal.jsx";
import LoginModal from "./modals/LoginModal.jsx";


export const MainHeader = () => {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const [modalType, setModalType] = useState(null)

    const returnToHome = () => {
        navigate("/")
    }

    const userIconClick = () => {
      user ? navigate("/storage") : setModalType('login')
    }

    const userBtnClick = () => {
        if (user) {
            logout()
        } else {
            setModalType('login')
        }
    }

    return (
        <>
            <div className="header-search-area">
                <Logo onClick={returnToHome}/>
                <SearchField/>
            </div>
            <div className="header-user-area">
                <UserProfileButton iconOnClick={userIconClick} btnOnClick={userBtnClick} btnTitle={user ? 'Выход' : 'Вход'}/>
            </div>

          {modalType === 'registration' && <RegistrationModal onClose={() => setModalType(null)}/>}
          {modalType === 'login' && <LoginModal onClose={() => setModalType(null)}/>}
        </>
    )
}
