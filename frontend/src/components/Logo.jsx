export const Logo = ({onClick}) => {

  const handleClick = (e) => {
    e.preventDefault()
    onClick()
  }

  return (
    <>
      <div className="header-logo" onClick={handleClick}></div>
    </>
  )
}