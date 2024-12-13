import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth } from '@supabase/auth-ui-react'
import { biobase } from './utils/supabaseClient'

ReactDOM.render(
  <React.StrictMode>
    <Auth.UserContextProvider supabaseClient={biobase}>
      <App />
    </Auth.UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
