export const ViewSelector = ({onChange}) => {
  const handleOnChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <>
      <select className="view-select" name="select storage view" onChange={handleOnChange}>
        <option className="view-option" value="list">List</option>
        <option className="view-option" value="grid">Grid</option>
      </select>
    </>
  )
}