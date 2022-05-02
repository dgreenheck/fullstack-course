import React from "react"

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

export default AddContactForm