import { ContextMenuContext } from './ContextMenuContext.js'
import { useState } from 'react'

export const ContextMenuProvider = ({ children }) => {
  const [contextMenuType, setContextMenuType] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 })
  const [currentElemId, setCurrentElemId] = useState(null)
  const [currentFileName, setCurrentFileName] = useState(null)
  const [currentElemRef, setCurrentElemRef] = useState(undefined)
  const [currentElemAPILink, setCurrentElemAPILink] = useState('')

  const openContextMenu = (e, data_id, menuType, elemRef, fileName, apiLink) => {
    e.preventDefault()

    if (contextMenuType) closeContextMenu(null)

    const style = {}
    const menuHeight = {
      file: 152,
      folder: 94,
    }
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const cursorX = e.clientX
    const cursorY = e.clientY

    const xOffset = viewportWidth - cursorX
    const yOffset = viewportHeight - cursorY

    if (xOffset < 185) {
      style.right = xOffset
    } else {
      style.left = e.pageX
    }

    if (yOffset < menuHeight[menuType]) {
      style.bottom = yOffset
    } else {
      style.top = e.pageY
    }

    setContextMenuPosition(style)

    setContextMenuType(menuType)
    setCurrentElemId(data_id)
    setCurrentFileName(fileName)
    setCurrentElemRef(elemRef)
    setCurrentElemAPILink(apiLink)
  }

  const closeContextMenu = () => {
    setContextMenuType(null)
    currentElemRef && currentElemRef.classList.remove('selected')
    setCurrentElemRef(undefined)
    setCurrentElemId(null)
    setCurrentElemAPILink('')
  }

  const hideContextMenu = () => {
    setContextMenuType(null)
  }

  return (
    <ContextMenuContext.Provider
      value={{
        openContextMenu,
        closeContextMenu,
        hideContextMenu,
        setCurrentFileName,
        setCurrentElemAPILink,
        setCurrentElemRef,
        setCurrentElemId,
        currentFileName,
        currentElemAPILink,
        currentElemId,
        contextMenuType,
        contextMenuPosition,
        currentElemRef,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  )
}
