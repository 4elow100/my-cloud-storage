import { Modal } from '../common/Modal.jsx'
import { useState, useEffect, useRef } from 'react'
import { useStorage } from '../../providers/storage/useStorage.js'
import { useModal } from '../../providers/modals/useModal.js'
import { useContextMenu } from '../../providers/contextMenu/useContextMenu.js'
import { Button } from '../common/Button.jsx'

export const RenameItemModal = () => {
  const { renameItem } = useStorage()
  const { openModal } = useModal()
  const { currentElemId, currentFileName } = useContextMenu()

  const [newItemName, setNewItemName] = useState(currentFileName)
  const [error, setError] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && currentFileName) {
      const dotIndex = currentFileName.lastIndexOf('.')
      const end = dotIndex > 0 ? dotIndex : currentFileName.length
      inputRef.current.focus()
      inputRef.current.setSelectionRange(0, end)
    }
  }, [currentElemId, currentFileName])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!newItemName.trim()) return

    try {
      renameItem(newItemName)
    } catch (err) {
      console.log(err)
      setError(err.message || 'Ошибка при переименовании')
    }
  }

  return (
    <Modal onClose={() => openModal(null)}>
      <h2>Переименование</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          ref={inputRef}
          type="text"
          placeholder="Новое название"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <Button type="submit">Переименовать</Button>
      </form>
    </Modal>
  )
}
