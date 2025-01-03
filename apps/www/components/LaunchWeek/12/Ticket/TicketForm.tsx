import { useState, useEffect } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { SITE_ORIGIN } from '~/lib/constants'
import { Button } from 'ui'
import { CheckCircle } from 'lucide-react'

import useConfData from '~/components/LaunchWeek/hooks/use-conf-data'

type FormState = 'default' | 'loading' | 'error'

export default function TicketForm() {
  const [formState, setFormState] = useState<FormState>('default')
  const [realtimeChannel, setRealtimeChannel] = useState<ReturnType<
    SupabaseClient['channel']
  > | null>(null)
  const [errorMsg] = useState('')
  const { biobase, session, setUserData, setTicketState, userData } = useConfData()
  const router = useRouter()

  // Triggered on session
  async function fetchOrCreateUser() {
    if (biobase && session?.user && !userData.id) {
      const username = session.user.user_metadata.user_name
      const name = session.user.user_metadata.full_name
      const email = session.user.email
      const userId = session.user.id

      if (!userData.id) {
        await biobase
          .from('tickets')
          .insert({
            user_id: userId,
            launch_week: 'lw12',
            email,
            name,
            username,
            referred_by: router.query?.referral ?? null,
          })
          .select()
          .single()
          .then(({ error }: any) => fetchUser({ error, username }))
      }
    }
  }

  const fetchUser = async ({ error, username }: any) => {
    if (!biobase) return

    // If error because of duplicate email, ignore and proceed, otherwise sign out.
    if (error && error?.code !== '23505') {
      setFormState('error')
      return biobase.auth.signOut()
    }

    const { data } = await biobase
      .from('tickets_view')
      .select('*')
      .eq('launch_week', 'lw12')
      .eq('username', username)
      .single()

    if (data) setUserData(data)

    setFormState('default')

    // Prefetch GitHub avatar
    new Image().src = `https://github.com/${username}.png`

    // Prefetch the twitter share URL to eagerly generate the page
    // fetch(`/launch-week/tickets/${username}?came_from_signup=true`).catch((_) => {})
    await fetch(`/api-v2/ticket-og?username=${username}`)

    if (!realtimeChannel) {
      const channel = biobase
        .channel('changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'tickets',
            filter: `username=eq.${username}`,
          },
          (payload: any) => {
            const platinum = !!payload.new.shared_on_twitter && !!payload.new.shared_on_linkedin
            const secret = !!payload.new.game_won_at
            setUserData({
              ...payload.new,
              platinum,
              secret,
            })
          }
        )
        .subscribe()
      setRealtimeChannel(channel)
    }
  }

  useEffect(() => {
    fetchOrCreateUser()

    return () => {
      // Cleanup realtime subscription on unmount
      realtimeChannel?.unsubscribe()
    }
  }, [session])

  async function handleGithubSignIn() {
    if (formState !== 'default') {
      setFormState('default')
      return
    }

    setFormState('loading')
    setTicketState('loading')

    const redirectTo = `${SITE_ORIGIN}/launch-week/${
      userData.username ? '?referral=' + userData.username : ''
    }`

    biobase?.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo,
      },
    })
  }

  return formState === 'error' ? (
    <div className="">
      <div>{errorMsg}</div>
      <Button
        type="secondary"
        onClick={() => {
          setFormState('default')
          setTicketState('registration')
        }}
      >
        Try Again
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-10 items-start justify-center relative z-20">
      <Button
        size="small"
        disabled={formState === 'loading' || Boolean(session)}
        onClick={handleGithubSignIn}
        iconLeft={session && <CheckCircle />}
        loading={formState === 'loading'}
      >
        Claim your ticket
      </Button>
    </div>
  )
}
