import React from "react"

const Contacts = ({ contacts, deleteContact }) => {
  return <>
    <h2>Contacts</h2>
    <ul>
      {contacts.map(contact =>
        <li key={contact.name}>
          {contact.name} {contact.phoneNumber}
          <button onClick={() => deleteContact(contact)}>Delete</button>
        </li>
      )}
    </ul>
  </>
}

export default Contacts;