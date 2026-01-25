export const ListRow = ({ children, onContextMenu, elemTypeClass, onDoubleClick, item_id }) => {
  return (
    <>
      <div
        className={`storage-list-row ${elemTypeClass}`}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        data-id={item_id}
      >
        {children}
      </div>
    </>
  )
}
