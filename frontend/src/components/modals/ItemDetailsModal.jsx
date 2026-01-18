import {useEffect, useState} from "react";
import {useStorage} from "../../providers/storage/useStorage.js";
import {Modal} from "../common/Modal.jsx";
import {useModal} from "../../providers/modals/useModal.js";

export const ItemDetailsModal = () => {
  const {getItemInfo, folderPath} = useStorage()
  const {openModal} = useModal()
  const [data, setData] = useState({})

  useEffect(() => {
    getItemInfo((d) => setData({
      name: d.name || d.original_name || null,
      size: d.size || null,
      uploaded_at: d.uploaded_at || d.created_at || null,
      last_download_at: d.last_download_at || null,
      comment: d.comment || null,
      share_link: d.public_token || null
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal onClose={() => openModal(null)}>
        <h2>Свойства</h2>
        {data.name && <p>Название: {data.name}</p>}
        <p>Путь: Хранилище/{folderPath.join('/')}</p>
        {data.size && <p>Размер: {data.size}</p>}
        {data.comment && <p>Комментарий: {data.comment}</p>}
        {data.uploaded_at && <p>Загружен: {data.uploaded_at}</p>}
        {data.last_download_at && <p>Последнее скачивание: {data.last_download_at}</p>}
        {data.share_link && <p>Публичная ссылка: {data.share_link}</p>}
      </Modal>
    </>
  )
}