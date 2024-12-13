import { biobase } from '@/lib/initBiobase'
import '@/styles/app.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={biobase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
