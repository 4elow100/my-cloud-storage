import { Modal } from "../common/Modal.jsx";
import { useRef, useState } from "react";
import {useStorage} from "../../providers/storage/useStorage.js";
import {useModal} from "../../providers/modals/useModal.js";


export const UploadFileModal = () => {
  const {uploadFile} = useStorage()
  const {openModal} = useModal()

  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    await uploadFile(file, comment);

    setFile(null);
    setComment('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const currentFile = e.target.files[0];
    if (!currentFile) return;
    setFile(currentFile);
  };

  return (
    <Modal onClose={() => openModal(null)}>
      <h2>Загрузка файла</h2>

      <form className="upload-file-form" onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Комментарий к файлу"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit" className="btn">Загрузить</button>
      </form>
    </Modal>
  );
};