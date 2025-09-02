import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Doctorcontextprovider from './context/Doctorcontextprovider'
createRoot(document.getElementById('root')).render(
  <Doctorcontextprovider>
    <App />
    </Doctorcontextprovider>
)
