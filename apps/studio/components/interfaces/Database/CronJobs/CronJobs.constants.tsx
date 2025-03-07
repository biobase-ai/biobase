import { EdgeFunctions, RESTApi, SqlEditor } from 'icons'
import { ScrollText } from 'lucide-react'

export const CRONJOB_TYPES = [
  'http_request',
  'edge_function',
  'sql_function',
  'sql_snippet',
] as const

export const CRONJOB_DEFINITIONS = [
  {
    value: 'sql_snippet',
    icon: <SqlEditor strokeWidth={1} />,
    label: 'SQL Snippet',
    description: 'Write a SQL snippet to run.',
  },
  {
    value: 'sql_function',
    icon: <ScrollText strokeWidth={1} />,
    label: 'Postgres SQL Function',
    description: 'Choose a Postgres SQL functions to run.',
  },

  {
    value: 'http_request',
    icon: <RESTApi strokeWidth={1} />,
    label: 'HTTP Request',
    description: 'Send an HTTP request to any URL.',
  },
  {
    value: 'edge_function',
    icon: <EdgeFunctions strokeWidth={1} />,
    label: 'Biobase Edge Function',
    description: 'Choose a Biobase edge function to run.',
  },
]

export type HTTPHeader = { name: string; value: string }

export type HTTPParameter = { name: string; value: string }
