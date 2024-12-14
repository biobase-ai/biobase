const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 使用环境变量
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3emtvZW9ibGR3bGVwa2lla2N5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDA3MzUyOCwiZXhwIjoyMDQ5NjQ5NTI4fQ.BuxRfKwYT4eSD6ZyqwvZctiJbtHYZfd1KcblthjlxfQ'

console.log('Using URL:', SUPABASE_URL)
console.log('Service Key:', SUPABASE_SERVICE_KEY ? 'Present' : 'Missing')

// 定义存储桶和文件类型的映射
const bucketConfig = {
  'biobase-brand-assets': {
    extensions: ['.svg', '.png', '.jpg', '.jpeg', '.zip'],
    patterns: [
      '**/logos/**/*',
      '**/icons/**/*',
      '**/brand/**/*',
      '**/badge-made-with-biobase*.svg'
    ]
  },
  'videos': {
    extensions: ['.mp4', '.webm'],
    patterns: ['**/videos/**/*', '**/*.mp4', '**/*.webm']
  },
  'images': {
    extensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
    patterns: [
      '**/images/**/*',
      '**/img/**/*',
      '**/twitter-profiles/**/*',
      '**/og/**/*',
      '**/favicon/**/*',
      '**/external-comms/**/*',
      '**/new/**/*'
    ]
  },
  'fonts': {
    extensions: ['.otf', '.ttf', '.woff', '.woff2'],
    patterns: [
      '**/fonts/**/*',
      '**/*.otf',
      '**/*.ttf',
      '**/*.woff',
      '**/*.woff2'
    ]
  }
}

const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.git/**',
  '**/.next/**',
  '**/coverage/**',
  '**/tmp/**',
  '**/temp/**'
]

async function initBuckets() {
  for (const [bucketName, config] of Object.entries(bucketConfig)) {
    try {
      const { data: buckets } = await supabase.storage.listBuckets()
      const exists = buckets?.find(b => b.name === bucketName)
      
      if (!exists) {
        console.log(`Creating bucket: ${bucketName}`)
        const { data, error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800, // 50MB
          allowedMimeTypes: config.extensions.map(ext => {
            switch(ext) {
              case '.svg': return 'image/svg+xml'
              case '.png': return 'image/png'
              case '.jpg':
              case '.jpeg': return 'image/jpeg'
              case '.gif': return 'image/gif'
              case '.mp4': return 'video/mp4'
              case '.webm': return 'video/webm'
              case '.mp3': return 'audio/mpeg'
              case '.wav': return 'audio/wav'
              case '.m4a': return 'audio/mp4'
              case '.otf': return 'font/otf'
              case '.ttf': return 'font/ttf'
              case '.woff': return 'font/woff'
              case '.woff2': return 'font/woff2'
              case '.zip': return 'application/zip'
              default: return '*'
            }
          })
        })
        if (error) throw error
        console.log(`Created bucket: ${bucketName}`)
      } else {
        console.log(`Bucket ${bucketName} already exists`)
      }
    } catch (error) {
      console.error(`Error with bucket ${bucketName}:`, error.message)
    }
  }
}

async function uploadFile(bucketName, filePath, targetPath) {
  try {
    // 检查文件是否已存在
    const { data: existingFile } = await supabase.storage
      .from(bucketName)
      .list(path.dirname(targetPath))
    
    const fileExists = existingFile?.some(f => f.name === path.basename(targetPath))
    
    if (fileExists) {
      console.log(`⏭️  Skipping ${targetPath} (already exists)`)
      return { success: true, skipped: true }
    }

    const fileContent = fs.readFileSync(filePath)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(targetPath, fileContent, {
        contentType: getContentType(path.extname(filePath)),
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(targetPath)

    console.log(`✅ Uploaded: ${targetPath}`)
    console.log(`   URL: ${publicUrl}`)
    return { success: true, publicUrl }
  } catch (error) {
    console.error(`❌ Error uploading ${targetPath}:`, error.message)
    return { success: false, error }
  }
}

function getContentType(extension) {
  const contentTypes = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.otf': 'font/otf',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.zip': 'application/zip'
  }
  return contentTypes[extension.toLowerCase()] || 'application/octet-stream'
}

function findFiles(patterns, baseDir, ignorePatterns = []) {
  const allFiles = new Set()
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, {
      cwd: baseDir,
      nodir: true,
      absolute: true,
      ignore: ignorePatterns
    })
    files.forEach(file => allFiles.add(file))
  })
  
  return Array.from(allFiles)
}

async function processFiles() {
  console.log('Initializing storage buckets...')
  await initBuckets()
  
  const baseDir = path.resolve('/Users/xingqiangchen/IECHOR/biobase')
  console.log('Searching in:', baseDir)

  let totalFiles = 0
  let uploadedFiles = 0
  let skippedFiles = 0
  let failedFiles = 0

  for (const [bucketName, config] of Object.entries(bucketConfig)) {
    console.log(`\nProcessing ${bucketName}...`)
    
    const files = findFiles(config.patterns, baseDir, IGNORE_PATTERNS)
    console.log(`Found ${files.length} files for ${bucketName}`)
    totalFiles += files.length
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (config.extensions.includes(ext)) {
        // 将文件路径转换为存储路径
        const relativePath = path.relative(baseDir, file)
        const targetPath = relativePath
        const result = await uploadFile(bucketName, file, targetPath)
        
        if (result.success) {
          if (result.skipped) {
            skippedFiles++
          } else {
            uploadedFiles++
          }
        } else {
          failedFiles++
        }
      }
    }
  }

  console.log('\nUpload Summary:')
  console.log(`Total files found: ${totalFiles}`)
  console.log(`Successfully uploaded: ${uploadedFiles}`)
  console.log(`Skipped (already exists): ${skippedFiles}`)
  console.log(`Failed: ${failedFiles}`)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
processFiles().catch(console.error)
