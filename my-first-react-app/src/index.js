import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Correct path since App.jsx is in src/components/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);