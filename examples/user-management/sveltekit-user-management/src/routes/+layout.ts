// src/routes/+layout.ts
import { PUBLIC_BIOBASE_ANON_KEY, PUBLIC_BIOBASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('biobase:auth')

  const biobase = isBrowser()
    ? createBrowserClient(PUBLIC_BIOBASE_URL, PUBLIC_BIOBASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_BIOBASE_URL, PUBLIC_BIOBASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await biobase.auth.getSession()

  return { biobase, session }
}