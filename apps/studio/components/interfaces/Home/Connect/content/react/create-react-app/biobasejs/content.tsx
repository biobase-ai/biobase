import type { ContentFileProps } from 'components/interfaces/Home/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTrigger,
  ConnectTabTriggers,
  ConnectTabContent,
} from 'components/interfaces/Home/Connect/ConnectTabs'
import { SimpleCodeBlock } from '@ui/components/SimpleCodeBlock'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value=".env.local" />
        <ConnectTabTrigger value="utils/biobase.ts" />
        <ConnectTabTrigger value="App.tsx" />
      </ConnectTabTriggers>

      <ConnectTabContent value=".env.local">
        <SimpleCodeBlock className="bash" parentClassName="min-h-72">
          {`
REACT_APP_BIOBASE_URL=${projectKeys.apiUrl ?? 'your-project-url'}
REACT_APP_BIOBASE_ANON_KEY=${projectKeys.anonKey ?? 'your-anon-key'}
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="utils/biobase.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_BIOBASE_URL;
const biobaseKey = process.env.REACT_APP_BIOBASE_ANON_KEY;

export const biobase = createClient(supabaseUrl, biobaseKey);
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="App.tsx">
        <SimpleCodeBlock className="tsx" parentClassName="min-h-72">
          {`
import { useState, useEffect } from 'react'
import { biobase } from '../utils/biobase'

function Page() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    function getTodos() {
      const { data: todos } = await biobase.from('todos').select()

      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
export default Page
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
