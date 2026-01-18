import {CreateFolderModal} from "../modals/CreateFolderModal.jsx";
import {UploadFileModal} from "../modals/UploadFileModal.jsx";
import RegistrationModal from "../modals/RegistrationModal.jsx";
import LoginModal from "../modals/LoginModal.jsx";
import {RenameItemModal} from "../modals/RenameItemModal.jsx";
import {DeleteConfirmModal} from "../modals/DeleteConfirmModal.jsx";
import {ItemDetailsModal} from "../modals/ItemDetailsModal.jsx";
import {useModal} from "../../providers/modals/useModal.js";


const modals = {
  createFolder: CreateFolderModal,
  uploadFile: UploadFileModal,
  registration: RegistrationModal,
  login: LoginModal,
  renameItem: RenameItemModal,
  deleteConfirm: DeleteConfirmModal,
  details: ItemDetailsModal,
}

export const ModalsList = () => {
  const { modalType } = useModal()
  const Modal = modals[modalType]

  return Modal ? <Modal /> : null
}