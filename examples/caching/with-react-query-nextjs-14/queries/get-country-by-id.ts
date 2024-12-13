import { TypedBiobaseClient } from '@/utils/types'

export function getCountryById(client: TypedBiobaseClient, countryId: number) {
  return client
    .from('countries')
    .select(
      `
      id,
      name
    `
    )
    .eq('id', countryId)
    .throwOnError()
    .single()
}
