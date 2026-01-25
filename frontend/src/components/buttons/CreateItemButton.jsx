import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export const CreateItemButton = () => {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal('createFolder')
  }

  return (
    <>
      <Button type="button" onClick={handleClick}>
        Создать папку
      </Button>
    </>
  )
}
