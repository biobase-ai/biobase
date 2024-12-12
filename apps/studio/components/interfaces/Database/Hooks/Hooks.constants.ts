import { BASE_PATH, IS_PLATFORM } from 'lib/constants'

export const HOOK_EVENTS = [
  {
    label: 'Insert',
    value: 'INSERT',
    description: 'Any insert operation on the table',
  },
  {
    label: 'Update',
    value: 'UPDATE',
    description: 'Any update operation, of any column in the table',
  },
  {
    label: 'Delete',
    value: 'DELETE',
    description: 'Any deletion of a record',
  },
]

export const AVAILABLE_WEBHOOK_TYPES = [
  {
    value: 'http_request',
    icon: `${BASE_PATH}/img/function-providers/http-request.png`,
    label: 'HTTP Request',
    description: 'Send an HTTP request to any URL.',
  },
  ...(IS_PLATFORM
    ? [
        {
          value: 'biobase_function',
          icon: `${BASE_PATH}/img/function-providers/biobase-severless-function.png`,
          label: 'Biobase Edge Functions',
          description: 'Choose a Biobase edge function to run.',
        },
      ]
    : []),
]
