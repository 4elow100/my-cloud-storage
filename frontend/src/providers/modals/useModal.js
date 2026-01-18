import {useContext} from "react";
import {ModalContext} from "./ModalContext.js";

export const useModal = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider")
  }

  return context
}