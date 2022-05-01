import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Search = ({ onChange, value }) => {
  return <>
    <h2>Search Contacts</h2>
    <div>
      Search: <input onChange={onChange} value={value} />
    </div>
  </>
}

const AddContactForm = (props) => {
  return <>
    <h2>Add Contact</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input onChange={props.onNameChange} value={props.newContact.name} />
      </div>
      <div>
        Phone #: <input onChange={props.onPhoneNumberChange} value={props.newContact.phoneNumber} />
      </div>
      <div>
        <button type="submit">Add Contact</button>
      </div>
    </form>
  </>
}

const Contacts = ({ contacts }) => {
  return <>
    <h2>Contacts</h2>
    <ul>
      {contacts.map(contact =>
        <li key={contact.name}>
          {contact.name} {contact.phoneNumber}
        </li>
      )}
    </ul>
  </>
}

const App = (props) => {

  /* State */
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  /* Event Handlers */
  const updateNewName = (event) => setNewName(event.target.value)
  const updatePhoneNumber = (event) => setPhoneNumber(event.target.value)
  const updateSearchText = (event) => setSearchText(event.target.value)

  const addContact = (event) => {
    /* Don't want to refresh the page */
    event.preventDefault()

    // If contact is already in phone book, don't add them
    if (contacts.some(contact => contact.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
    } else {
      const contact = {
        name: newName,
        phoneNumber: newPhoneNumber
      }
      setContacts(contacts.concat(contact))
      setNewName('')
      setPhoneNumber('')
    }
  }

  /* Effect Hooks */
  
  useEffect(() => {
    console.log('GET http://localhost:3001/contacts')
    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        console.log('Contacts received')
        setContacts(response.data)
      })
  }, [])

  // Filter the contacts
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Search onChange={updateSearchText} value={searchText} />
      <AddContactForm 
        newContact = {{ 
         name: newName,
          phoneNumber: newPhoneNumber
        }}
        onSubmit={addContact} 
        onNameChange={updateNewName}
        onPhoneNumberChange={updatePhoneNumber}
      />
      <Contacts contacts={filteredContacts} />
    </div>
  )
}

export default App