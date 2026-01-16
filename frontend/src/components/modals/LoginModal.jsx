import {useState} from "react"
import {useAuth} from "../../hooks/useAuth.js"
import {useNavigate} from "react-router-dom"

export default function LoginModal({onClose}) {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login("RegUser3", "pass112342223")
        .then(() => {
          onClose()
          navigate("/storage")
        })
    } catch {
      setError("Неверный логин или пароль")
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}