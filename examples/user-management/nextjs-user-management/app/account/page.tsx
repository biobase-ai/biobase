import AccountForm from './account-form'
import { createClient } from '@/utils/biobase/server'

export default async function Account() {
  const biobase = await createClient()

  const {
    data: { user },
  } = await biobase.auth.getUser()

  return <AccountForm user={user} />
}
