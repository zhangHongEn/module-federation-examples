import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import aA from "mfapp01/App"
console.log(222, aA)

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
