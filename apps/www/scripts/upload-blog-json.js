const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

const { rimraf } = require('rimraf')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials')
  console.error('SUPABASE_URL:', SUPABASE_URL)
  console.error('SUPABASE_SERVICE_KEY:', SUPABASE_SERVICE_KEY ? 'Present' : 'Missing')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function cleanupLocalFiles(contentlayerDir) {
  try {
    console.log('Cleaning up local JSON files...')
    await rimraf(contentlayerDir)
    console.log('Local JSON files cleaned up successfully')
  } catch (error) {
    console.error('Error cleaning up local files:', error)
  }
}

async function testBlogJsonAccess(bucketName) {
  try {
    console.log('Testing blog JSON access...')
    const { data: files, error } = await supabase
      .storage
      .from(bucketName)
      .list()
    
    if (error) throw error
    
    if (files && files.length > 0) {
      // Test accessing a random file
      const testFile = files[0]
      const { data, error: fetchError } = await supabase
        .storage
        .from(bucketName)
        .download(testFile.name)
      
      if (fetchError) throw fetchError
      
      console.log('✅ Blog JSON access test passed')
      console.log(`Successfully accessed ${testFile.name}`)
    } else {
      console.log('⚠️ No files found in the bucket')
    }
  } catch (error) {
    console.error('❌ Blog JSON access test failed:', error)
  }
}

async function uploadBlogJsonFiles() {
  const contentlayerDir = path.resolve(__dirname, '../.contentlayer/generated/BlogPost')
  const bucketName = 'blog-json'
  
  // 查找所有 JSON 文件
  const jsonFiles = glob.sync('**/*.json', { 
    cwd: contentlayerDir,
    absolute: true
  })

  console.log(`Found ${jsonFiles.length} blog JSON files`)

  // 初始化存储桶
  try {
    const { data: buckets } = await supabase.storage.listBuckets()
    const exists = buckets?.find(b => b.name === bucketName)
    
    if (!exists) {
      console.log(`Creating bucket: ${bucketName}`)
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['application/json']
      })
    }
  } catch (error) {
    console.error('Error creating bucket:', error)
    return
  }

  // 准备博客文章索引
  const blogPostFiles = jsonFiles
    .map(file => path.relative(contentlayerDir, file))
    .filter(filename => !filename.includes('_index.json'))

  // 创建索引文件
  const indexData = {
    blogPosts: blogPostFiles
  }

  const indexFilePath = path.join(contentlayerDir, '_index.json')
  fs.writeFileSync(indexFilePath, JSON.stringify(indexData, null, 2))

  // 上传索引文件
  try {
    const indexFileContent = fs.readFileSync(indexFilePath)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload('_index.json', indexFileContent, {
        contentType: 'application/json',
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Error uploading index file:', error)
    } else {
      console.log('✅ Uploaded index file')
    }
  } catch (error) {
    console.error('Error processing index file:', error)
  }

  // 上传每个 JSON 文件
  for (const filePath of jsonFiles) {
    try {
      const fileContent = fs.readFileSync(filePath)
      const relativePath = path.relative(contentlayerDir, filePath)
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(relativePath, fileContent, {
          contentType: 'application/json',
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        console.error(`Error uploading ${relativePath}:`, error)
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(relativePath)

        console.log(`✅ Uploaded: ${relativePath}`)
        console.log(`   Public URL: ${publicUrl}`)
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error)
    }
  }

  // Test blog JSON access
  await testBlogJsonAccess(bucketName)
  
  // Clean up local files
  await cleanupLocalFiles(contentlayerDir)
}

uploadBlogJsonFiles().catch(console.error)
