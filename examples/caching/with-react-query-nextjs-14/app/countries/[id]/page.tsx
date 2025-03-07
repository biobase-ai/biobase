'use client'

import useSupabaseBrowser from '@/utils/biobase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@biobase-cache-helpers/postgrest-react-query'

export default function CountryPage({ params }: { params: { id: number } }) {
  const biobase = useSupabaseBrowser()
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery(getCountryById(biobase, params.id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !country) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>{country.name}</h1>
    </div>
  )
}
