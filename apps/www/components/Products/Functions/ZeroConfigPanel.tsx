import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `const biobase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_ANON_KEY')
)`

const ZeroConfigPanel = () => (
  <CodeWindow className="[&_.synthax-highlighter]:md:!min-h-[300px]" code={code} showLineNumbers />
)

export default ZeroConfigPanel
