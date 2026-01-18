import {useModal} from "../../providers/modals/useModal.js";

export const CreateItemButton = () => {
  const {openModal} = useModal()

  const handleClick = () => {
    openModal('createFolder')
  }

  return (
    <>
      <button className="create-item-btn btn" type="button" onClick={handleClick}>Создать папку</button>
    </>
  )
}