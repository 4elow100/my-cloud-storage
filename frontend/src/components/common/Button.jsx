export const Button = ({ children, type, onClick }) => {
  return (
    <button className="common-btn" type={type} onClick={onClick}>
      {children}
    </button>
  )
}
