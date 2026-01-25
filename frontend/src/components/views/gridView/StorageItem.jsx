export const StorageItem = ({ children, onContextMenu, elemTypeClass, onDoubleClick, item_id }) => {
  return (
    <>
      <div
        className={`storage-item btn ${elemTypeClass}`}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
        data-id={item_id}
      >
        {children}
      </div>
    </>
  )
}
