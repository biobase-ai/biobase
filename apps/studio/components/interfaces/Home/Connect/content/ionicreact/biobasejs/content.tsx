import type { ContentFileProps } from 'components/interfaces/Home/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTriggers,
  ConnectTabTrigger,
  ConnectTabContent,
} from 'components/interfaces/Home/Connect/ConnectTabs'
import { SimpleCodeBlock } from '@ui/components/SimpleCodeBlock'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value=".env" />
        <ConnectTabTrigger value="src/biobaseClient.tsx" />
        <ConnectTabTrigger value="src/App.tsx" />
      </ConnectTabTriggers>

      <ConnectTabContent value=".env">
        <SimpleCodeBlock className="bash" parentClassName="min-h-72">
          {`
REACT_APP_SUPABASE_URL=${projectKeys.apiUrl ?? 'your-project-url'}
REACT_APP_SUPABASE_ANON_KEY=${projectKeys.anonKey ?? 'your-anon-key'}
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/biobaseClient.tsx">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { createClient } from '@supabase/biobase-js'

const biobaseUrl = process.env.REACT_APP_SUPABASE_URL
const biobaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const biobase = createClient(biobaseUrl, biobaseAnonKey)
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/App.tsx">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import React, { useEffect, useState } from 'react';
import { setupIonicReact, IonApp } from '@ionic/react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Theme variables */
import './theme/variables.css';

import { biobase } from './biobaseClient';

setupIonicReact();

export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const { data, error } = await biobase.from('todos').select();

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }

      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  return (
    <IonApp>
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Todos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {todos.map((todo) => (
              <IonItem key={todo.id}>{todo.title}</IonItem>
            ))}
          </IonList>
        </IonContent>
      </>
    </IonApp>
  );
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
