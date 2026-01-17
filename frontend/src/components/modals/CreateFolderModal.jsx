import {Modal} from "../common/Modal.jsx";
import {useState} from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const CreateFolderModal = ({onClose, onSubmit}) => {
  const [newFolderName, setNewFolderName] = useState('')
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newFolderName.trim()) return

    onSubmit(newFolderName)
      .catch(err => setError(err))
  }

  return (
    <>
      <Modal onClose={onClose}>
        <h2>Создание папки</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Название папки"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
          />
          <button type="submit">Создать</button>
        </form>
      </Modal>
    </>
  )
}