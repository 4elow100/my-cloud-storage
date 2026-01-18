import {useAuth} from "../providers/auth/useAuth.js";
import {useModal} from "../providers/modals/useModal.js";


export const HomePage = () => {
  const {user} = useAuth()
  const {openModal} = useModal()

  return (
    <>
      <h1>Облачное хранилище My Cloud</h1>

      <h2>Добро пожаловать!</h2>
      <div className="app-information-block">
        <p>
          Это веб-приложение предназначено для хранения, управления и обмена файлами в личном файловом хранилище.
          После регистрации вы сможете:
        </p>
        <ul>
          <li>Загружать файлы и создавать папки;</li>
          <li>Просматривать файлы в браузере или скачивать их;</li>
          <li>Переименовывать и удалять файлы;</li>
          <li>Получать специальные ссылки для доступа к файлам;</li>
          <li>Управлять структурой файлового хранилища.</li>
        </ul>
      </div>

      <section className="registration-requirements">
        <h3>Требования к регистрации</h3>
        <div className="requirements-container">
          <div className="requirement-block">
            <h4>Логин</h4>
            <ul>
              <li>Длина от 4 до 20 символов</li>
              <li>Первый символ — латинская буква</li>
              <li>Состоит только из латинских букв и цифр</li>
            </ul>
          </div>

          <div className="requirement-block">
            <h4>Пароль</h4>
            <ul>
              <li>Длина от 6 символов и выше</li>
              <li>Содержит минимум одну заглавную букву</li>
              <li>Содержит минимум одну цифру и один спец. символ</li>
            </ul>
          </div>

          <div className="requirement-block">
            <h4>Email</h4>
            <ul>
              <li>Должен соответствовать формату адреса электронной почты.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="app-additional-info">
        <p>После регистрации вы будете перенаправлены на страницу своего файлового хранилища</p>
        <p>При нажатии на логотип вы перейдете на главную страницу</p>
        <p>При нажатии на иконку пользователя вы перейдете на страницу своего хранилища</p>
      </div>

      <div className="user-buttons-area">
        {!user &&
          <>
            <button onClick={() => openModal('login')}>Войти</button>
            <button onClick={() => openModal('registration')}>Зарегистрироваться</button>
          </>
        }
      </div>
    </>
  )
}