import {ModalContext} from "./ModalContext.js";
import {useState} from "react";
import {useContextMenu} from "../contextMenu/useContextMenu.js";


export const ModalProvider = ({children}) => {
  const [modalType, setModalType] = useState(null);
  const {hideContextMenu, closeContextMenu, } = useContextMenu()

  const openModal = (newModalType) => {
    newModalType ? hideContextMenu() : closeContextMenu()
    setModalType(newModalType)
  }

  return (
    <ModalContext.Provider value={{openModal, modalType}}>
      {children}
    </ModalContext.Provider>
  )
}