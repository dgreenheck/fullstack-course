import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const initialContacts = [
  { 
    name: 'Jerry Garsprinkles',
    phoneNumber: '425-615-2693'
  },
  { 
    name: 'Mona Lisa',
    phoneNumber: '123-456-7890'
  },
  { 
    name: 'Tommy Marbles',
    phoneNumber: '111-222-3333'
  },
  { 
    name: 'Darby Stark',
    phoneNumber: '920-548-2847'
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(<App initialContacts={initialContacts}/>);