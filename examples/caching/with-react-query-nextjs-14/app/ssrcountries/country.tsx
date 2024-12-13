// app/posts/posts.jsx
'use client'

import useBiobaseBrowser from '@/utils/biobase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@biobase-cache-helpers/postgrest-react-query'

export default function Country({ id }: { id: number }) {
  const biobase = useBiobaseBrowser()
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data: country } = useQuery(getCountryById(biobase, id))

  return (
    <div>
      <h1>SSR: {country?.name}</h1>
    </div>
  )
}
