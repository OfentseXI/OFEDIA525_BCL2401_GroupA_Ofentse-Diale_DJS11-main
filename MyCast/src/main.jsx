import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AudioPlayerContextProvider from './context/AudioPlayerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioPlayerContextProvider>
        <App />
      </AudioPlayerContextProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
