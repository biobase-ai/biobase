import { SupabaseClient } from '@supabase/supabase-js'
import { ApplicationError, UserError, clippy } from 'ai-commands/edge'
import { NextRequest } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

export const config = {
  runtime: 'edge',
  /* To avoid OpenAI errors, restrict to the Vercel Edge Function regions that
  overlap with the OpenAI API regions.
  
  Reference for Vercel regions: https://vercel.com/docs/edge-network/regions#region-list
  Reference for OpenAI regions: https://help.openai.com/en/articles/5347006-openai-api-supported-countries-and-territories
  */
  regions: [
    'arn1',
    'bom1',
    'cdg1',
    'cle1',
    'cpt1',
    'dub1',
    'fra1',
    'gru1',
    'hnd1',
    'iad1',
    'icn1',
    'kix1',
    'lhr1',
    'pdx1',
    'sfo1',
    'sin1',
    'syd1',
  ],
}

const openAiKey = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_BIOBASE_URL as string
const supabaseServiceKey = process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY as string

const configuration = new Configuration({
  apiKey: openAiKey,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextRequest) {
  if (!openAiKey) {
    return new Response(
      JSON.stringify({
        error: 'No OPENAI_API_KEY set. Create this environment variable to use AI features.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (!supabaseUrl) {
    return new Response(
      JSON.stringify({
        error: 'No NEXT_PUBLIC_BIOBASE_URL set. Create this environment variable to use AI features.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (!supabaseServiceKey) {
    return new Response(
      JSON.stringify({
        error: 'No NEXT_PUBLIC_BIOBASE_ANON_KEY set. Create this environment variable to use AI features.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    switch (req.method) {
      case 'POST':
        return await handlePost(req)
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        })
    }
  } catch (error) {
    if (error instanceof UserError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    } else if (error instanceof ApplicationError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      throw error
    }
  }
}

async function handlePost(request: NextRequest) {
  const body = await (request.json() as Promise<{
    messages: { content: string; role: 'user' | 'assistant' }[]
  }>)

  const { messages } = body

  if (!messages) {
    throw new UserError('Missing messages in request data')
  }

  const supabaseClient = new SupabaseClient(supabaseUrl, supabaseServiceKey)

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0,
    })

    const data = await completion.json()
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: error.message,
          data: error.data,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else if (error instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${error.message}: ${JSON.stringify(error.data)}`)
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(error)
    }

    // TODO: include more response info in debug environments
    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
