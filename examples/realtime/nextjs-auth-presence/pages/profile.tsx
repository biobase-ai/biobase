import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'

export default function Profile({ user }: { user: User }) {
  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [<Link href="/protected-page">biobaseServerClient</Link>]
      </p>
      <div>Hello {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Biobase Client
  const biobase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await biobase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}
