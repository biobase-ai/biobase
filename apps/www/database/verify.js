const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wwzkoeobldwlepkiekcy.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3emtvZW9ibGR3bGVwa2lla2N5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDA3MzUyOCwiZXhwIjoyMDQ5NjQ5NTI4fQ.BuxRfKwYT4eSD6ZyqwvZctiJbtHYZfd1KcblthjlxfQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyTables() {
  try {
    // Check partners table
    const { data: partners, error: partnersError } = await supabase
      .from('partners')
      .select('*')
      .limit(1)
    
    console.log('\nPartners table:')
    if (partnersError) {
      console.error('Error:', partnersError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', partners)
    }

    // Check users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    console.log('\nUsers table:')
    if (usersError) {
      console.error('Error:', usersError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', users)
    }

    // Check user_roles table
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1)
    
    console.log('\nUser roles table:')
    if (rolesError) {
      console.error('Error:', rolesError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', roles)
    }

    // Check role_permissions table
    const { data: permissions, error: permissionsError } = await supabase
      .from('role_permissions')
      .select('*')
      .limit(1)
    
    console.log('\nRole permissions table:')
    if (permissionsError) {
      console.error('Error:', permissionsError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', permissions)
    }

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

verifyTables()