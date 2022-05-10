import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'Make Not Important'
    : 'Make Important';

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.object,
  toggleImportance: PropTypes.func
};

export default Note;
