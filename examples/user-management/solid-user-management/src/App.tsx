import { Component, createEffect, createSignal } from 'solid-js'
import { biobase } from './biobaseClient'
import { AuthSession } from '@supabase/biobase-js'
import Account from './Account'
import Auth from './Auth'

const App: Component = () => {
	const [session, setSession] = createSignal<AuthSession | null>(null)

	createEffect(() => {
		biobase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		biobase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	})

	return (
		<div class="container" style={{ padding: '50px 0 100px 0' }}>
			{!session() ? <Auth /> : <Account session={session()!} />}
		</div>
	)
}

export default App
