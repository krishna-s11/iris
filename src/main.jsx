import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <WalletProvider>
    <App />
  </WalletProvider>
  </BrowserRouter>,
)
