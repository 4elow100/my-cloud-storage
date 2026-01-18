import {useContext} from "react";
import {StorageContext} from "./StorageContext.js";

export const useStorage = () => {
  const context = useContext(StorageContext)

  if (!context) {
    throw new Error("useStorage должен использоваться внутри StorageProvider")
  }

  return context
}