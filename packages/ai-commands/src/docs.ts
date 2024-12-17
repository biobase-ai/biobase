import type { SupabaseClient } from '@supabase/supabase-js'
import type OpenAI from 'openai'
import { ApplicationError } from './errors'
import type { Message } from './types'

export async function clippy(
  openai: OpenAI,
  supabaseClient: SupabaseClient<any, 'public', any>,
  messages: Message[]
) {
  // Basic message validation
  const contextMessages = messages.filter(({ role }) => ['user', 'assistant'].includes(role))
    .map(({ role, content }) => ({ role, content: content.trim() }))

  const userMessage = contextMessages.find(({ role }) => role === 'user')
  if (!userMessage) {
    throw new Error("No user message found")
  }

  // Simplified moderation (remove detailed flagging)
  try {
    await Promise.all(
      contextMessages.map((message) => openai.moderations.create({ input: message.content }))
    )
  } catch (error) {
    throw new ApplicationError('Content moderation failed')
  }

  // Simplified embedding
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: userMessage.content.replace(/\n/g, ' '),
  })

  const [{ embedding }] = embeddingResponse.data

  // Simplified vector search
  const { data: pageSections } = await supabaseClient
    .rpc('match_page_sections_v2', {
      embedding,
      match_threshold: 0.85,
      min_content_length: 100,
    })
    .neq('rag_ignore', true)
    .select('content')
    .limit(5)

  const contextText = pageSections
    .map(section => section.content)
    .join('\n---\n')

  const completionOptions = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for Biobase documentation.',
      },
      {
        role: 'user',
        content: `Documentation Context:\n${contextText}\n\nUser Query: ${userMessage.content}`,
      }
    ],
    max_tokens: 512,
    temperature: 0.7,
    stream: true,
  }

  // Direct fetch to reduce dependencies
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      Authorization: `Bearer ${openai.apiKey}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(completionOptions),
  })

  if (!response.ok) {
    throw new ApplicationError('Failed to generate completion')
  }

  return response
}
