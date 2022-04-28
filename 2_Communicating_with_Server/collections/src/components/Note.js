import React from 'react'

const Note = ({note}) => {
  const text = (note.important ? "[!] " : "").concat(note.content)
  return <li>{text}</li>
}

export default Note