import { Modal } from "../common/Modal.jsx";
import { useRef, useState } from "react";

export const UploadFileModal = ({ onSubmit, onClose }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    await onSubmit(file, comment);

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
    <Modal onClose={onClose}>
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