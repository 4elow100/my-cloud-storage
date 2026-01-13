export const Modal = ({children}) => {
  return (
    <>
      <div className="modal-back">
        <div className="modal-container">
          {children}
        </div>
      </div>
    </>
  )
}