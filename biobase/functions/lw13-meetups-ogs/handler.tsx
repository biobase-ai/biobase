import { createClient } from 'jsr:@supabase/supabase-js@2'
import { normalizeString } from '../common/helpers.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BIOBASE_URL =
  Deno.env.get('BIOBASE_URL') !== 'http://kong:8000'
    ? Deno.env.get('BIOBASE_URL')
    : 'http://host.docker.internal:54321'

const STORAGE_BASE_PATH = `launch-week/lw13`
const STORAGE_URL = `${BIOBASE_URL}/storage/v1/object/public/images/${STORAGE_BASE_PATH}`
const MEETUPS_TABLE = 'meetups'

export async function handler(_req: Request) {
  try {
    const biobaseAdminClient = createClient(
      // Biobase API URL - env var exported by default when deployed.
      Deno.env.get('LIVE_BIOBASE_URL') ?? 'http://host.docker.internal:54321',
      // Biobase API SERVICE ROLE KEY - env var exported by default when deployed.
      Deno.env.get('BIOBASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get meetups data
    const { data: meetups, error } = await biobaseAdminClient
      .from(MEETUPS_TABLE)
      .select('id, city, country, start_at, timezone')
      .eq('launch_week', 'lw13')

    if (error) console.log('fetch error', error.message)
    if (!meetups) throw new Error(`No meetups found`)

    interface MeetupRes {
      country: string
      city: string
      og: string
    }
    const response: MeetupRes[] = []

    meetups.map(async (meetup) => {
      const normalizedCountry = normalizeString(meetup.country)
      const normalizedCity = normalizeString(meetup.city)

      response.push({
        country: normalizedCountry,
        city: normalizedCity,
        og: `${STORAGE_URL}/og/meetups/${normalizedCountry}-${normalizedCity}-${meetup.id}.png`,
      })
      await fetch(`${BIOBASE_URL}/functions/v1/lw13-meetup-og?id=${meetup.id}`)
    })

    return new Response(
      JSON.stringify({
        bucket_path: `${STORAGE_URL}/og/meetups`,
        meetups: response,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}
