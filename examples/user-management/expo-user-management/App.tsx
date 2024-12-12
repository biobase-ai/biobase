import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { biobase } from './lib/biobase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    biobase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    biobase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}
