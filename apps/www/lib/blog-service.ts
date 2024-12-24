import { createClient } from '@supabase/supabase-js'
import biobaseMisc from './biobaseMisc'
import { allPosts } from 'contentlayer/generated'

const BLOG_BUCKET = 'blog-json'
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second
const FETCH_TIMEOUT = 5000 // 5 seconds
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wwzkoeobldwlepkiekcy.supabase.co'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getCachedData(key: string) {
  const cached = cache.get(key)
  if (!cached) return null
  
  const now = Date.now()
  if (now - cached.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }
  
  return cached.data
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetchWithTimeout(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying fetch (${retries} attempts left)...`)
      await sleep(RETRY_DELAY)
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

export interface BlogPost {
  title: string
  description: string
  slug: string
  publishedAt: string
  author: string
  image?: string
  tags?: string[]
  categories?: string[]
  content: string
}

export interface BlogPostPreview {
  title: string
  description: string
  slug: string
  publishedAt: string
  author: string
  image?: string
  tags?: string[]
  categories?: string[]
}

export interface PaginatedBlogPosts {
  posts: BlogPostPreview[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

async function ensureBlogBucket() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('No Supabase credentials found, falling back to local content')
    return false
  }

  try {
    // First try to list the bucket contents directly
    const { data: files, error: listError } = await biobaseMisc.storage
      .from('blog-json')
      .list()

    if (!listError && files) {
      return true
    }

    // If that fails, check if bucket exists
    const { data: buckets, error: bucketsError } = await biobaseMisc.storage.listBuckets()
    if (bucketsError) {
      console.warn('Error listing buckets:', bucketsError)
      return false
    }

    const bucketExists = buckets?.some(b => b.name === 'blog-json')
    if (!bucketExists) {
      console.warn('Blog storage bucket not found, falling back to local content')
      return false
    }

    // Bucket exists but we might not have access
    console.warn('Blog storage bucket exists but might not be accessible')
    return false
  } catch (error) {
    console.error('Error checking blog bucket:', error)
    return false
  }
}

async function getPublicStorageUrl(filename: string) {
  const { data } = await biobaseMisc.storage.from('blog-json').getPublicUrl(filename)
  return data.publicUrl
}

export async function fetchBlogPostJson(filename: string) {
  const cacheKey = `post:${filename}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const url = `${SUPABASE_URL}/storage/v1/object/public/${BLOG_BUCKET}/${filename}`
    const response = await fetchWithRetry(url)
    const data = await response.json()
    const processedData = {
      ...data,
      slug: data.url?.replace('/blog/', '') || data._raw?.flattenedPath || filename.replace('.mdx.json', ''),
      date: data.date || data.publishedAt,
      body: {
        raw: data.body?.raw || data.content || ''
      }
    }
    setCachedData(cacheKey, processedData)
    return processedData
  } catch (error) {
    console.error(`Error fetching blog post ${filename}:`, error)
    // Fall back to contentlayer data if available
    const fallbackPost = allPosts.find(p => p.slug === filename.replace('.mdx.json', ''))
    if (fallbackPost) {
      return {
        ...fallbackPost,
        body: {
          raw: fallbackPost.content || ''
        }
      }
    }
    return null
  }
}

export async function fetchBlogIndex() {
  const cacheKey = 'blogIndex'
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const url = `${SUPABASE_URL}/storage/v1/object/public/${BLOG_BUCKET}/index.json`
    const response = await fetchWithRetry(url)
    const data = await response.json()
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching blog index:', error)
    // Fall back to contentlayer data
    return { posts: allPosts.map(post => post.slug + '.mdx.json') }
  }
}

function getImageUrl(post: any): string | undefined {
  if (!post.image) return undefined

  // If image is a full URL, return it as is
  if (post.image.startsWith('http')) return post.image

  // If image starts with /blog/, remove it
  const imagePath = post.image.startsWith('/blog/') 
    ? post.image.slice(6) 
    : post.image

  // Get the public URL from Supabase storage
  try {
    const { data: { publicUrl } } = biobaseMisc.storage
      .from('images')
      .getPublicUrl(`blog/${imagePath}`)
    return publicUrl
  } catch (error) {
    console.error('Error getting image URL:', error)
    return undefined
  }
}

export async function fetchBlogPosts(
  page = 1, 
  pageSize = 10,
  category?: string
): Promise<PaginatedBlogPosts> {
  const hasBucket = await ensureBlogBucket()
  let posts = []

  if (hasBucket) {
    // Try to fetch from storage
    try {
      const { blogPosts } = await fetchBlogIndex()
      const fetchedPosts = await Promise.all(
        blogPosts.map((filename: string) => fetchBlogPostJson(filename))
      )
      posts = fetchedPosts.filter(post => post !== null)
    } catch (error) {
      console.error('Error fetching posts from storage:', error)
      posts = []
    }
  }

  // Fall back to contentlayer if storage fails or is empty
  if (posts.length === 0) {
    posts = allPosts
  }

  // Sort by date
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.published_at || a.date)
    const dateB = new Date(b.published_at || b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // Filter by category if specified
  const filteredPosts = category && category !== 'all'
    ? sortedPosts.filter(post => post.categories?.includes(category))
    : sortedPosts

  const start = (page - 1) * pageSize
  // Paginate
  const paginatedPosts = filteredPosts.slice(start, start + pageSize).map(post => ({
    title: post.title,
    description: post.description || '',
    slug: post.slug,
    publishedAt: post.published_at || post.date,
    author: post.author || 'Biobase Team',
    image: getImageUrl(post),
    tags: post.tags,
    categories: post.categories
  }))

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    pageSize,
    hasMore: start + pageSize < filteredPosts.length
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const hasBucket = await ensureBlogBucket()
  let post = null

  if (hasBucket) {
    // Try to fetch from storage
    try {
      const { blogPosts } = await fetchBlogIndex()
      for (const filename of blogPosts) {
        const fetchedPost = await fetchBlogPostJson(filename)
        const postSlug = fetchedPost?.url?.replace('/blog/', '') || 
                        fetchedPost?._raw?.flattenedPath || 
                        filename.replace('.mdx.json', '')
        if (postSlug === slug) {
          post = fetchedPost
          break
        }
      }
    } catch (error) {
      console.error('Error fetching post from storage:', error)
    }
  }

  // Fall back to contentlayer if storage fails
  if (!post) {
    post = allPosts.find(p => p.slug === slug)
  }

  if (!post) return null

  return {
    title: post.title,
    description: post.description || '',
    slug: post.url?.replace('/blog/', '') || post._raw?.flattenedPath || post.slug,
    publishedAt: post.date || post.publishedAt,
    author: post.author || 'Biobase Team',
    image: getImageUrl(post),
    tags: post.tags,
    categories: post.categories,
    content: post.body?.raw || post.content || ''
  }
}
