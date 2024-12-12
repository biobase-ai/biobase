import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth } from '@supabase/auth-ui-react'
import { biobase } from './utils/biobaseClient'

ReactDOM.render(
  <React.StrictMode>
    <Auth.UserContextProvider biobaseClient={biobase}>
      <App />
    </Auth.UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
