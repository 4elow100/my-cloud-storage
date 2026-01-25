export const ContextMenu = ({ children, style }) => {
  return (
    <>
      <div className="context-menu-container" style={style}>
        {children}
      </div>
    </>
  )
}
