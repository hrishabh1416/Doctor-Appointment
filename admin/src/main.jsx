import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/AdminContextProvider'
createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <App />
    </AdminContextProvider>
)
