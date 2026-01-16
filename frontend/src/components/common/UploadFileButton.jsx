import {useRef} from "react";
import getCookie from "../../utils/getCookie.js";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const UploadFileButton = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/storage/files/upload/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка загрузки");

      alert("Файл загружен");
    } catch (err) {
      console.error(err);
      alert("Ошибка при загрузке файла");
    }
  };

  return (
    <>
      <button className="upload-file-btn btn" onClick={handleButtonClick}>Загрузить файл</button>

      <input
        type="file"
        ref={fileInputRef}
        style={{display: "none"}}
        onChange={handleFileChange}
      />
    </>
  );
};