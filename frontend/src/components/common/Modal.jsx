import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Modal = ({children, onClose}) => {
  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          {children}
          <button onClick={onClose} className="modal-close-btn btn">
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </div>
      </div>
    </>
  )
}