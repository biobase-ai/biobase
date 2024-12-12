import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `const biobase = createClient(
  Deno.env.get('BIOBASE_URL')!,
  Deno.env.get('BIOBASE_ANON_KEY')!,
  {
    global: {
      headers: {
        Authorization:
          req.headers.get('Authorization')!
      }
    }
  }
)

const { data, error } = await biobase
                                .from('countries')
                                .select('*')`

const ConnectToDBPanel = () => (
  <CodeWindow className="[&_.synthax-highlighter]:!min-h-[200px]" code={code} showLineNumbers />
)

export default ConnectToDBPanel
