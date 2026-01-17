import {useState} from "react"
import {useAuth} from "../../hooks/useAuth.js"
import {useNavigate} from "react-router-dom"
import {Modal} from "../common/Modal.jsx";

export default function LoginModal({onClose}) {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
        .then(() => {
          onClose()
          navigate("/storage")
        })
    } catch {
      setError("Неверный логин или пароль")
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </Modal>
  )
}