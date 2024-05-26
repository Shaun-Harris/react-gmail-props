function Email({ email, toggleRead, toggleStar, onSelectEmail }) {
  return (
    <li 
      className={`email ${email.read ? 'read' : 'unread'}`}
      onClick={() => onSelectEmail(email)}
    >
      <div className="select" onClick={(e) => e.stopPropagation()}>
        <input
          className="select-checkbox"
          type="checkbox"
          checked={email.read}
          onChange={() => toggleRead(email)}
        />
      </div>
      <div className="star" onClick={(e) => e.stopPropagation()}>
        <input
          className="star-checkbox"
          type="checkbox"
          checked={email.starred}
          onChange={() => toggleStar(email)}
        />
      </div>
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
    </li>
  )
}

export default Email
