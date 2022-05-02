import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

/* Components */
import Contacts from './components/Contacts'
import AddContactForm from './components/AddContactForm'
import SearchBar from './components/SearchBar'

/* Services */
import contactService from './services/contacts'

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

    // If contact is already in phone book, ask user if they want to update the phone number
    let existingContact = contacts.find(contact => contact.name === newName)
    if (existingContact != null) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace old number with a new one?`)) {
        const updatedContact = { ...existingContact, phoneNumber: newPhoneNumber }
        contactService
          .update(existingContact.id, updatedContact)
          .then(newContact => {
            console.log(`Updated phone number for contact ${newContact.name} from ${existingContact.phoneNumber} to ${newContact.phoneNumber}`)
            setContacts(contacts.map(contact => contact.id === existingContact.id ? updatedContact : contact))
            setNewName('')
            setPhoneNumber('')
          })
      }
    } else {
      const contact = {
        name: newName,
        phoneNumber: newPhoneNumber
      }

      contactService
        .create(contact)
        .then(newContact => {
          console.log(`New contact added: ${newContact.name} ${newContact.phoneNumber}`)
          setContacts(contacts.concat(newContact))
          setNewName('')
          setPhoneNumber('')
        })
    }
  }

  const deleteContact = contactToDelete => {
    if (window.confirm(`Delete ${contactToDelete.name}?`) == true) {
      contactService
        .deleteContact(contactToDelete.id)
        .then(() => {
          console.log(`Deletion of ${contactToDelete.name} was successful.`)
          setContacts(contacts.filter(contact => contact.id !== contactToDelete.id))
        })
        .catch(error => {
          alert(`Contact ${contactToDelete.name} was already deleted.`)
          setContacts(contacts.filter(contact => contact.id !== contactToDelete.id))
        })
    }
  }

  /* Effect Hooks */

  useEffect(() => {
    console.log('GET http://localhost:3001/contacts')
    contactService
      .getAll()
      .then(initialContacts => {
        console.log('Contacts received')
        setContacts(initialContacts)
      })
  }, [])

  // Filter the contacts
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar
        onChange={updateSearchText}
        value={searchText}
      />
      <AddContactForm
        newContact={{
          name: newName,
          phoneNumber: newPhoneNumber
        }}
        onSubmit={addContact}
        onNameChange={updateNewName}
        onPhoneNumberChange={updatePhoneNumber}
      />
      <Contacts
        contacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App