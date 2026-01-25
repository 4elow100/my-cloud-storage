import { Modal } from '../common/Modal.jsx'
import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export const ConfirmModal = ({ message, callback }) => {
  const { openModal } = useModal()

  return (
    <>
      <Modal onClose={() => openModal(null)}>
        <h2>Подтверждение</h2>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <Button type="button" onClick={() => callback()}>
            Да
          </Button>
          <Button type="button" onClick={() => openModal(null)}>
            Отмена
          </Button>
        </div>
      </Modal>
    </>
  )
}
