const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wwzkoeobldwlepkiekcy.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3emtvZW9ibGR3bGVwa2lla2N5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDA3MzUyOCwiZXhwIjoyMDQ5NjQ5NTI4fQ.BuxRfKwYT4eSD6ZyqwvZctiJbtHYZfd1KcblthjlxfQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyDocsTables() {
  try {
    // Check docs_metadata table
    const { data: metadata, error: metadataError } = await supabase
      .from('docs_metadata')
      .select('*')
      .limit(1)
    
    console.log('\nDocs metadata table:')
    if (metadataError) {
      console.error('Error:', metadataError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', metadata)
    }

    // Check docs_versions table
    const { data: versions, error: versionsError } = await supabase
      .from('docs_versions')
      .select('*')
      .limit(1)
    
    console.log('\nDocs versions table:')
    if (versionsError) {
      console.error('Error:', versionsError)
    } else {
      console.log('✓ Table exists')
      console.log('Sample data:', versions)
    }

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

verifyDocsTables()
