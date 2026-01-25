import { useContext } from 'react'
import { ContextMenuContext } from './ContextMenuContext.js'

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext)

  if (!context) {
    throw new Error('useContextMenu должен использоваться внутри ContextMenuProvider')
  }

  return context
}
