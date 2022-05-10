import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import noteService from './services/notes';

noteService
  .getAll()
  .then(response => {
    const notes = response.data;
    ReactDOM.createRoot(document.getElementById('root')).render(
      <App notes={notes} />
    );
  });
