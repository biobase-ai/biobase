import BiobaseLogo from '@/components/BiobaseLogo'
import AuthButton from '../components/AuthButton'
import Link from 'next/link'
import { createClient } from '@/utils/biobase/server'

export default async function Index() {
  const biobase = createClient()

  const {
    data: { user },
  } = await biobase.auth.getUser()

  return (
    <main className="flex flex-col gap-6 items-center h-full mt-40">
      <h2 className="flex items-center gap-6">
        <BiobaseLogo />
      </h2>
      {user ? (
        <Link
          href="/protected"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Chat
        </Link>
      ) : (
        <AuthButton />
      )}
    </main>
  )
}
