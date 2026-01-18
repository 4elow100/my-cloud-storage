import {ContextMenuContext} from "./ContextMenuContext.js";
import {useState} from "react";


export const ContextMenuProvider = ({children}) => {
  const [contextMenuType, setContextMenuType] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({left: 0, top: 0});
  const [currentElemId, setCurrentElemId] = useState(null)
  const [currentFileName, setCurrentFileName] = useState(null)
  const [currentElemRef, setCurrentElemRef] = useState(undefined)
  const [currentElemAPILink, setCurrentElemAPILink] = useState('')

  const openContextMenu = (e, data_id, menuType, elemRef, fileName, apiLink) => {
    e.preventDefault()

    if (contextMenuType) closeContextMenu(null)

    setContextMenuPosition({
      left: e.pageX,
      top: e.pageY
    })

    setContextMenuType(menuType)
    setCurrentElemId(data_id)
    setCurrentFileName(fileName)
    setCurrentElemRef(elemRef)
    setCurrentElemAPILink(apiLink)
  }

  const closeContextMenu = () => {
    setContextMenuType(null)
    currentElemRef && currentElemRef.classList.remove("selected")
    setCurrentElemRef(undefined)
    setCurrentElemId(null)
    setCurrentElemAPILink('')
  }

  const hideContextMenu = () => {
    setContextMenuType(null)
  }

  return (
    <ContextMenuContext.Provider value={{openContextMenu, closeContextMenu, hideContextMenu,
      setCurrentFileName, setCurrentElemAPILink, setCurrentElemRef, setCurrentElemId,
      currentFileName, currentElemAPILink, currentElemId, contextMenuType, contextMenuPosition}}>
      {children}
    </ContextMenuContext.Provider>
  )
}