import { SupabaseClient } from '@supabase/supabase-js'
import { ApplicationError, UserError } from 'ai-commands'
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

// Use Node.js runtime with specific configuration
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
    responseLimit: false, // Remove response size limit
  },
}

const openAiKey = process.env.OPENAI_API_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_BIOBASE_URL as string
const supabaseServiceKey = process.env.NEXT_PUBLIC_BIOBASE_ANON_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!openAiKey) {
    return res.status(500).json({
      error: 'No OPENAI_API_KEY set. Create this environment variable to use AI features.',
    })
  }

  if (!supabaseUrl) {
    return res.status(500).json({
      error: 'No NEXT_PUBLIC_BIOBASE_URL set. Create this environment variable to use AI features.',
    })
  }

  if (!supabaseServiceKey) {
    return res.status(500).json({
      error: 'No NEXT_PUBLIC_BIOBASE_ANON_KEY set. Create this environment variable to use AI features.',
    })
  }

  const { method } = req

  switch (method) {
    case 'POST':
      return handlePost(req, res)
    default:
      return res.status(405).setHeader('Allow', 'POST').json({
        data: null,
        error: { message: `Method ${method} Not Allowed` }
      })
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI({ apiKey: openAiKey })

  // Parse the request body manually since bodyParser is disabled
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk))
  }
  const body = JSON.parse(Buffer.concat(chunks).toString()) as {
    messages: { content: string; role: 'user' | 'assistant' }[]
  }

  const { messages } = body

  if (!messages) {
    throw new UserError('Missing messages in request data')
  }

  const supabaseClient = new SupabaseClient(supabaseUrl, supabaseServiceKey)

  try {
    // Create a stream for the chat completion
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      stream: true,
    })

    // Set appropriate headers for SSE
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Stream the response
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`)
      }
    }

    res.end()
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof UserError) {
      return res.status(400).json({
        error: error.message,
        data: error.data,
      })
    } else if (error instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${error.message}: ${JSON.stringify(error.data)}`)
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(error)
    }

    // TODO: include more response info in debug environments
    return res.status(500).json({
      error: 'There was an error processing your request',
    })
  }
}
