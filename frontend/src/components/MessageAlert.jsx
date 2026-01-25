export const MessageAlert = ({ data }) => {
  return (
    <>
      <div className="message-alert-container" style={{ border: `2px solid ${data.color}` }}>
        {data.message}
      </div>
    </>
  )
}
