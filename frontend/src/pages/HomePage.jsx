import {useAuth} from "../hooks/useAuth.js";
import {useState} from "react";
import RegistrationModal from "../components/modals/RegistrationModal.jsx";
import LoginModal from "../components/modals/LoginModal.jsx";


export const HomePage = () => {
  const {user, logout} = useAuth()
  const [modalType, setModalType] = useState(null)

  return (
    <>
      <h1>Мой Дипломный Проект</h1>

      <div>
        {user ? (
          <>
            <span>Привет, {user.username}</span>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <button onClick={() => setModalType('login')}>Войти</button>
            <button onClick={() => setModalType('registration')}>Зарегистрироваться</button>
          </>
        )}
      </div>

      {modalType === 'registration' && <RegistrationModal onClose={() => setModalType(null)}/>}
      {modalType === 'login' && <LoginModal onClose={() => setModalType(null)}/>}
    </>
  )
}