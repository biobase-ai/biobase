import { createClient } from '@/utils/biobase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const biobase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await biobase.auth.getUser()

  if (user) {
    await biobase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}