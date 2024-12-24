import { createClient } from '@supabase/supabase-js'
import biobaseMisc from './biobaseMisc'
import { allPosts, type Post } from 'contentlayer/generated'

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
      content: data.body?.raw || data.content || ''
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
        content: fallbackPost.body?.raw || ''
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
    return { posts: allPosts.map((post: Post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      publishedAt: post.date,
      author: post.author || 'Biobase Team',
      image: post.image,
      tags: post.tags || [],
      categories: []
    })) }
  }
}

export async function fetchBlogPosts(
  page = 1, 
  pageSize = 10,
  category?: string
): Promise<PaginatedBlogPosts> {
  const { posts } = await fetchBlogIndex()
  
  // Filter by category if specified
  const filteredPosts = category && category !== 'all'
    ? posts.filter((post: BlogPostPreview) => post.categories?.includes(category))
    : posts

  // Sort by date
  const sortedPosts = filteredPosts.sort((a: BlogPostPreview, b: BlogPostPreview) => {
    const dateA = new Date(a.publishedAt)
    const dateB = new Date(b.publishedAt)
    return dateB.getTime() - dateA.getTime()
  })

  const start = (page - 1) * pageSize
  const paginatedPosts = sortedPosts.slice(start, start + pageSize)

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    page,
    pageSize,
    hasMore: start + pageSize < filteredPosts.length
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { posts } = await fetchBlogIndex()
  const post = posts.find((p: BlogPostPreview) => p.slug === slug)
  
  if (!post) return null

  const fullPost = await fetchBlogPostJson(post.slug + '.mdx.json')
  if (!fullPost) return null

  return {
    title: fullPost.title,
    description: fullPost.description || '',
    slug: fullPost.slug,
    publishedAt: fullPost.date || fullPost.publishedAt,
    author: fullPost.author || 'Biobase Team',
    image: fullPost.image,
    tags: fullPost.tags,
    categories: fullPost.categories,
    content: fullPost.content
  }
}
