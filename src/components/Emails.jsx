import Email from './Email'

function Emails({ emails, toggleRead, toggleStar, onSelectEmail }) {
  return (
    <main className="emails">
      <ul>
        {emails.map(email => (
          <Email
            key={email.id}
            email={email}
            toggleRead={toggleRead}
            toggleStar={toggleStar}
            onSelectEmail={onSelectEmail}
          />
        ))}
      </ul>
    </main>
  )
}

export default Emails
