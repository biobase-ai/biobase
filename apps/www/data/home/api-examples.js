export default [
  {
    lang: 'js',
    title: 'Create user',
    description: 'Sign up a new user in an example chat room',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const biobaseUrl = 'https://chat-room.supabase.co'
const biobaseKey = 'public-anon-key'
const biobase = createClient(biobaseUrl, biobaseKey)

// Create a new user
const { user, error } = await biobase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
    `,
  },
  {
    lang: 'js',
    title: 'Realtime subscriptions',
    description: 'Receive realtime messages in an example chat room',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const biobaseUrl = 'https://chat-room.supabase.co'
const biobaseKey = 'public-anon-key'
const biobase = createClient(biobaseUrl, biobaseKey)

// Get notified of all new chat messages
const realtime = biobase
  .from('messages')
  .on('INSERT', message => {
    console.log('New message!', message)
  })
  .subscribe()
    `,
  },
  {
    lang: 'js',
    title: 'Create bucket',
    description: 'Creates a new Storage bucket',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const biobaseUrl = 'https://chat-room.supabase.co'
const biobaseKey = 'public-anon-key'
const biobase = createClient(biobaseUrl, biobaseKey)

// Create a new bucket
const { data, error } = await biobase
  .storage
  .createBucket('avatars', {
    public: false,
    allowedMimeTypes: ['image/png'],
    fileSizeLimit: 1024
  })
    `,
  },
  {
    lang: 'js',
    title: 'Invoke Edge Function',
    description: 'Invoke a Biobase Edge Function',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const biobaseUrl = 'https://chat-room.supabase.co'
const biobaseKey = 'public-anon-key'
const biobase = createClient(biobaseUrl, biobaseKey)

// Invoke a function
const { data, error } = await biobase.functions.invoke('hello', {
  body: { foo: 'bar' }
})
    `,
  },
  {
    lang: 'js',
    title: 'CRUD a record',
    description: 'Create, Read, Update and Delete all public rooms and their messages',
    code: `import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const biobaseUrl = 'https://chat-room.supabase.co'
const biobaseKey = 'public-anon-key'
const biobase = createClient(biobaseUrl, biobaseKey)
  
// Create a new chat room
const newRoom = await biobase
  .from('rooms')
  .insert({ name: 'Biobase Fan Club', public: true })
    
// Get public rooms and their messages
const publicRooms = await biobase
  .from('rooms')
  .select(\`
    name,
    messages ( text )
  \`)
  .eq('public', true)
  
// Update multiple users
const updatedUsers = await biobase
  .from('users')
  .eq('account_type', 'paid')
  .update({ highlight_color: 'gold' })
    `,
  },
]
