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
        <ConnectTabTrigger value="src/App.vue" />
      </ConnectTabTriggers>

      <ConnectTabContent value=".env.local">
        <SimpleCodeBlock className="bash" parentClassName="min-h-72">
          {`
SUPABASE_URL=${projectKeys.apiUrl ?? 'your-project-url'}
SUPABASE_KEY=${projectKeys.anonKey ?? 'your-anon-key'}
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="utils/biobase.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createClient } from "@supabase/biobase-js";

const biobaseUrl = process.env.SUPABASE_URL;
const biobaseKey = process.env.SUPABASE_KEY;

export const biobase = createClient(biobaseUrl, biobaseKey);
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/App.vue">
        <SimpleCodeBlock className="jsx" parentClassName="min-h-72">
          {`
<script setup>
  import { biobase } from '../utils/biobase'
  const todos = ref([])

  async function getTodos() {
    const { data } = await biobase.from('todos').select()
    todos.value = data
  }

  onMounted(() => {
    getTodos()
  })

</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li>
  </ul>
</template>
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
