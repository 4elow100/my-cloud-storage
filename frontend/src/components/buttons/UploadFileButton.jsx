import { useModal } from '../../providers/modals/useModal.js'
import { Button } from '../common/Button.jsx'

export const UploadFileButton = () => {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal('uploadFile')
  }

  return (
    <>
      <Button type="button" onClick={handleClick}>
        Загрузить файл
      </Button>
    </>
  )
}
