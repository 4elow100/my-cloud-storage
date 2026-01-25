import { useState } from 'react'
import { useAuth } from '../../providers/auth/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../common/Modal.jsx'
import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export default function LoginModal() {
  const { login } = useAuth()
  const { openModal } = useModal()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const me = await login(username, password)
      openModal(null)
      me.is_staff ? navigate('/admin') : navigate('/storage')
    } catch (err) {
      console.log(err)
      setError('Неверный логин или пароль')
    }
  }

  return (
    <Modal onClose={() => openModal(null)}>
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
        <Button type="submit">Войти</Button>
      </form>
    </Modal>
  )
}
