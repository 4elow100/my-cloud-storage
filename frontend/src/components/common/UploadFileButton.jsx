import {useModal} from "../../providers/modals/useModal.js";

export const UploadFileButton = () => {
  const {openModal} = useModal()

  const handleClick = () => {
    openModal('uploadFile')
  }

  return (
    <>
      <button className="upload-file-btn btn" type="button" onClick={handleClick}>Загрузить файл</button>
    </>
  );
};