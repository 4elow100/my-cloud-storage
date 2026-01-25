import { Modal } from '../common/Modal.jsx'
import { useEffect, useRef, useState } from 'react'
import { useStorage } from '../../providers/storage/useStorage.js'
import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export const CreateFolderModal = () => {
  const { createFolder } = useStorage()
  const { openModal } = useModal()

  const [newFolderName, setNewFolderName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!newFolderName.trim()) return

    try {
      createFolder(newFolderName)
    } catch (err) {
      console.log(err)
      setError(err)
    }
  }

  return (
    <>
      <Modal onClose={() => openModal(null)}>
        <h2>Создание папки</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Название папки"
            ref={inputRef}
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
          />
          <Button type="submit">Создать</Button>
        </form>
      </Modal>
    </>
  )
}
