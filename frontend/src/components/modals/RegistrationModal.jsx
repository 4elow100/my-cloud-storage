import {useEffect, useState} from "react"
import {useAuth} from "../../hooks/useAuth.js"
import {useNavigate} from "react-router-dom"
import {Modal} from "../common/Modal.jsx";
import {validateEmail, validatePassword, validateUsername} from "../../utils/validate.js";


export default function RegistrationModal({onClose}) {
  const {registration} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [error, setError] = useState("")
  const [errorPasswordAgree, setErrorPasswordAgree] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validUsername = validateUsername(username)
    const validPassword = validatePassword(password)
    const validEmail = validateEmail(email)

    if (!validUsername.valid) {
      setError(validUsername.message)
      return
    }

    if (!validPassword.valid) {
      setError(validPassword.message)
      return
    }

    if (!validEmail.valid) {
      setError(validEmail.message)
      return
    }

    if (password !== passwordRepeat) {
      setErrorPasswordAgree('Пароли не совпадают!')
      return
    }

    try {
      await registration(
        {
          "username": username,
          "first_name": firstName,
          "last_name": lastName,
          "password": password,
          "email": email
        }).then(() => {
        onClose()
        navigate("/storage")
      })
    } catch {
      setError("Неверный логин или пароль")
    }
  }

  const passwordAgree = (value) => {
    setPasswordRepeat(value)
    setErrorPasswordAgree(password === value ? '' : 'Пароли не совпадают!')
  }

  return (
    <Modal onClose={onClose}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
            setError('')
          }}
        />
        <input
          type="text"
          placeholder="Почта для регистрации"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            setError('')
          }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setError('')
          }}
        />
        {errorPasswordAgree && <p className="error">{errorPasswordAgree}</p>}
        <input
          type="password"
          placeholder="Повторите пароль"
          value={passwordRepeat}
          onChange={e => {
            passwordAgree(e.target.value)
            setError('')
          }}
        />
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value)
            setError('')
          }}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value)
            setError('')
          }}
        />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </Modal>
  )
}