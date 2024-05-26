import { useState, useEffect } from 'react' // Import React hooks
import initialEmails from './data/emails' // Import initial email data
import Emails from './components/Emails' // Import Emails component for email list
import EmailDetail from './components/EmailDetail' // Import EmailDetail component for email details
import './styles/App.css' // Import CSS for App styles
import './styles/Email.css' // Import CSS for Email styles

function App() {
  // State for storing the list of emails, initialized with initialEmails
  const [emails, setEmails] = useState(initialEmails)
  // State to determine if read emails should be hidden
  const [hideRead, setHideRead] = useState(false)
  // State to keep track of the current tab ('inbox' or 'starred')
  const [currentTab, setCurrentTab] = useState('inbox')
  // State to keep track of the currently selected email for detailed view
  const [selectedEmail, setSelectedEmail] = useState(null)

  // Function to filter out read emails
  const getReadEmails = (emails) => emails.filter(email => !email.read)
  // Function to filter out starred emails
  const getStarredEmails = (emails) => emails.filter(email => email.starred)

  // Function to get filtered emails based on hideRead and currentTab states
  const getFilteredEmails = () => {
    let filteredEmails = emails
    if (hideRead) filteredEmails = getReadEmails(filteredEmails) // Filter read emails if hideRead is true
    if (currentTab === 'starred') filteredEmails = getStarredEmails(filteredEmails) // Filter starred emails if currentTab is 'starred'
    return filteredEmails
  }

  // State to store the filtered list of emails
  const [filteredEmails, setFilteredEmails] = useState(getFilteredEmails())

  // Effect to update the filteredEmails state whenever hideRead, currentTab, or emails change
  useEffect(() => {
    setFilteredEmails(getFilteredEmails())
  }, [hideRead, currentTab, emails, ge]) // Dependencies: hideRead, currentTab, emails

  // Function to toggle the starred status of an email
  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map(email =>
      email.id === targetEmail.id ? { ...email, starred: !email.starred } : email // Toggle the starred status
    )
    setEmails(updatedEmails) // Update the emails state with the modified list
  }

  // Function to toggle the read status of an email
  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map(email =>
      email.id === targetEmail.id ? { ...email, read: !email.read } : email // Toggle the read status
    )
    setEmails(updatedEmails) // Update the emails state with the modified list
  }

  // Variables to store lists of unread and starred emails
  const unreadEmails = getReadEmails(emails)
  const starredEmails = getStarredEmails(emails)

  // JSX structure of the App component
  return (
    <div className="app">
      {/* Header section with a menu icon and search bar */}
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input className="search-bar" placeholder="Search mail" />
        </div>
      </header>

      {/* Navigation section with tabs for inbox and starred emails, and a checkbox to hide read emails */}
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')} // Set current tab to 'inbox'
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span> {/* Display count of unread emails */}
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')} // Set current tab to 'starred'
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span> {/* Display count of starred emails */}
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)} // Toggle hideRead state
            />
          </li>
        </ul>
      </nav>

      {/* Conditional rendering: show EmailDetail if an email is selected, otherwise show Emails */}
      {selectedEmail ? (
        <EmailDetail 
          email={selectedEmail} 
          onBack={() => setSelectedEmail(null)} // Deselect email to go back to list
          toggleRead={toggleRead} 
          toggleStar={toggleStar}
        />
      ) : (
        <Emails 
          emails={filteredEmails} // Pass filtered emails to Emails component
          toggleRead={toggleRead} 
          toggleStar={toggleStar} 
          onSelectEmail={setSelectedEmail} // Set selected email for detail view
        />
      )}
    </div>
  )
}

export default App
