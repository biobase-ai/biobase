import { BiobaseClient, Session } from '@supabase/biobase-js'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			biobase: BiobaseClient
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
		}
		interface PageData {
			session: Session | null
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
