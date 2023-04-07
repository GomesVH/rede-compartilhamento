import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// importar a store
import { store } from './stores/store.js';
// importar o recurso Provider
import { Provider } from 'react-redux';
// importar o recurso BrowserRouter
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
    </BrowserRouter>    
  </React.StrictMode>
);