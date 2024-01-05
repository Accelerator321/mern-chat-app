import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from 'react-router-dom';
import SocketProvider from './context/socketProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <AuthProvider>
    <SocketProvider>
      
    <App />
    
    </SocketProvider>
    </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
