import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'
import './index.css'

// import i18n (needs to be bundled ;)) 
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
