import {Modal} from "../common/Modal.jsx";
import {useStorage} from "../../providers/storage/useStorage.js";
import {useModal} from "../../providers/modals/useModal.js";
import {useContextMenu} from "../../providers/contextMenu/useContextMenu.js";


export const DeleteConfirmModal = () => {
  const {openModal} = useModal()
  const {currentFileName} = useContextMenu()
  const {deleteItem} = useStorage()


  const handleDelete = () => {
    try {
      deleteItem()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Modal onClose={() => openModal(null)}>
        <h2>Подтверждение</h2>
        <p>Вы уверены, что хотите удалить {currentFileName}?</p>
        <button type="button" onClick={handleDelete}>Да</button>
        <button type="button" onClick={() => openModal(null)}>Отмена</button>
      </Modal>
    </>
  )
}