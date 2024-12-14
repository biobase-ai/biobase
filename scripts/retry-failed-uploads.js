const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3emtvZW9ibGR3bGVwa2lla2N5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDA3MzUyOCwiZXhwIjoyMDQ5NjQ5NTI4fQ.BuxRfKwYT4eSD6ZyqwvZctiJbtHYZfd1KcblthjlxfQ'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const failedFiles = [
  {
    path: 'apps/www/public/images/blog/2021-nov/graphql.png',
    bucket: 'images'
  },
  {
    path: 'apps/www/public/images/blog/2021-july/biobase-launch-the-sql.png',
    bucket: 'images'
  },
  {
    path: 'apps/docs/public/img/custom-docs.png',
    bucket: 'images'
  }
]

async function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const contentTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  }
  return contentTypes[ext] || 'application/octet-stream'
}

async function uploadFile(bucketName, filePath) {
  try {
    const baseDir = path.resolve(__dirname, '..')
    const fullPath = path.join(baseDir, filePath)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`)
      return false
    }

    const fileBuffer = fs.readFileSync(fullPath)
    const contentType = await getContentType(filePath)
    
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: true
      })

    if (error) {
      console.error(`❌ Error uploading ${filePath}:`, error.message)
      return false
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    console.log(`✅ Uploaded: ${filePath}`)
    console.log(`   URL: ${publicUrl}`)
    return true
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message)
    return false
  }
}

async function retryFailedUploads() {
  console.log('Starting to retry failed uploads...\n')
  
  let successful = 0
  let failed = 0

  for (const file of failedFiles) {
    const success = await uploadFile(file.bucket, file.path)
    if (success) {
      successful++
    } else {
      failed++
    }
  }

  console.log('\nRetry Summary:')
  console.log(`Successfully uploaded: ${successful}`)
  console.log(`Failed: ${failed}`)
}

retryFailedUploads().catch(console.error)
