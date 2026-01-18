import {useAuth} from "../providers/auth/useAuth.js";
import {Logo} from "./Logo.jsx";
import {useNavigate} from "react-router-dom";
import {SearchField} from "./SearchField.jsx";
import {UserProfileButton} from "./UserProfileButton.jsx";
import {useModal} from "../providers/modals/useModal.js";


export const MainHeader = () => {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const {openModal} = useModal()

    const returnToHome = () => {
        navigate("/")
    }

    const userIconClick = () => {
      user ? navigate("/storage") : openModal('login')
    }

    const userBtnClick = () => {
        if (user) {
            logout()
        } else {
            openModal('login')
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
        </>
    )
}
