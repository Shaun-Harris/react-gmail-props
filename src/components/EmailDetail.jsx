// EmailDetail component definition
function EmailDetail({ email, onBack, toggleRead, toggleStar }) {
  // The comp returns JSX structure representing view of an email
  return (
    <div className="email-detail"> {/* Outer container with class for styling */}
      
      {/* Button to navigate back, calls the onBack function when clicked */}
      <button onClick={onBack}>Back</button>

      {/* Heading displaying the email title */}
      <h2>{email.title}</h2>

      {/* Heading displaying the email sender */}
      <h3>From: {email.sender}</h3>

      {/* Div displaying the email body */}
      <div>{email.body}</div>

      {/* Div containing controls for read and star status */}
      <div>
        {/* Label and checkbox to toggle read status */}
        <label>
          <input
            type="checkbox"
            checked={email.read} // Checkbox checked state reflects email's read status
            onChange={() => toggleRead(email)} // Calls toggleRead function when changed
          />
          Mark as {email.read ? 'Unread' : 'Read'} {/* Dynamic text based on read status */}
        </label>

        {/* Label and checkbox to toggle star status */}
        <label>
          <input
            type="checkbox"
            checked={email.starred} // Checkbox checked state reflects starred status
            onChange={() => toggleStar(email)} // Calls toggleStar function when changed
          />
          {email.starred ? 'Unstar' : 'Star'} {/* Dynamic text based on star status */}
        </label>
      </div>
    </div>
  );
}

// Export
export default EmailDetail;
