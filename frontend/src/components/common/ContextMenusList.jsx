import {useContextMenu} from "../../providers/contextMenu/useContextMenu.js";
import {FileContextMenu} from "../contextMenus/FileContextMenu.jsx";
import {FolderContextMenu} from "../contextMenus/FolderContextMenu.jsx";

const menus = {
  file: FileContextMenu,
  folder: FolderContextMenu,
}

export const ContextMenusList = () => {
  const { contextMenuType } = useContextMenu()
  const ContextMenu = menus[contextMenuType]

  return ContextMenu ? <ContextMenu /> : null
}