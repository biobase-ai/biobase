import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Constants
export const FILENAME_SUBSTRING = 11 // based on YYYY-MM-DD format

// Storage bucket constants
const STORAGE_BUCKETS = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  BRAND_ASSETS: 'biobase-brand-assets',
  FONTS: 'fonts'
} as const

// Cache URLs to avoid repeated Supabase calls
const urlCache = new Map<string, string>()

// Helper function to get public URL for assets with caching
function getStorageUrl(bucket: string, path: string): string {
  if (!path) return ''
  
  const cacheKey = `${bucket}:${path}`
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  const url = data.publicUrl
  urlCache.set(cacheKey, url)
  return url
}

// Helper to process content and replace local paths with Supabase URLs
function processContent(content: string): string {
  if (!content) return ''
  
  // Replace image paths
  content = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, path) => {
      if (path.startsWith('http')) return match
      const publicUrl = getStorageUrl(STORAGE_BUCKETS.IMAGES, path)
      return `![${alt}](${publicUrl})`
    }
  )

  // Replace video paths
  content = content.replace(
    /<video[^>]*src=["']([^"']+)["'][^>]*>/g,
    (match, path) => {
      if (path.startsWith('http')) return match
      const publicUrl = getStorageUrl(STORAGE_BUCKETS.VIDEOS, path)
      return match.replace(path, publicUrl)
    }
  )

  return content
}

export type Directories = '_blog' | '_case-studies' | '_customers' | '_alternatives' | '_events'

type GetSortedPostsParams = {
  directory: Directories
  limit?: number
  offset?: number
  tags?: string[]
  runner?: unknown
  currentPostSlug?: string
  categories?: any
}

// Optimize post data selection based on usage
const POST_LIST_FIELDS = 'slug, title, description, created_at, category, image'
const POST_DETAIL_FIELDS = 'content, title, description, created_at, category, image, tags'

export async function getSortedPosts({
  directory,
  limit = 9,
  offset = 0,
  categories
}: GetSortedPostsParams) {
  let query = supabase
    .from('posts')
    .select(POST_LIST_FIELDS)
    .eq('type', directory.replace('_', ''))
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (categories && categories.length > 0) {
    query = query.in('category', categories)
  }

  const { data: posts, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.created_at,
    category: post.category,
    image: post.image ? getStorageUrl(STORAGE_BUCKETS.IMAGES, post.image) : null,
    url: `/${directory.replace('_', '')}/${post.slug}`
  }))
}

// Helper function to extract date from filename
export function getDatesFromFileName(filename: string) {
  const year = filename.substring(0, 4)
  const month = filename.substring(5, 7)
  const day = filename.substring(8, 10)
  return { year, month, day }
}

export async function getPostData(slug: string, directory: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select(POST_DETAIL_FIELDS)
    .eq('slug', slug)
    .eq('type', directory.replace('_', ''))
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return {
    ...post,
    image: post.image ? getStorageUrl(STORAGE_BUCKETS.IMAGES, post.image) : null,
    content: processContent(post.content)
  }
}

// Cache management
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class Cache<T> {
  private store = new Map<string, CacheEntry<T>>()
  
  get(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    
    const now = Date.now()
    if (now - entry.timestamp > CACHE_TTL) {
      this.store.delete(key)
      return null
    }
    
    return entry.data
  }
  
  set(key: string, data: T) {
    this.store.set(key, { data, timestamp: Date.now() })
  }
}

const categoriesCache = new Cache<string[]>()
const countCache = new Cache<number>()
const tagsCache = new Cache<string[]>()

export async function getAllCategories(directory: Directories) {
  const cached = categoriesCache.get(directory)
  if (cached) return cached

  const { data: categories, error } = await supabase
    .from('posts')
    .select('category')
    .eq('type', directory.replace('_', ''))
    .not('category', 'is', null)
    .select('category')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  const result = categories.map((c: { category: string }) => c.category)
  categoriesCache.set(directory, result)
  return result
}

export async function getTotalPostCount(directory: Directories, category?: string) {
  const cacheKey = `${directory}:${category || 'all'}`
  const cached = countCache.get(cacheKey)
  if (cached !== null) return cached

  let query = supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('type', directory.replace('_', ''))

  if (category) {
    query = query.eq('category', category)
  }

  const { count, error } = await query

  if (error) {
    console.error('Error getting post count:', error)
    return 0
  }

  const result = count || 0
  countCache.set(cacheKey, result)
  return result
}

export async function getAllTags(directory: Directories) {
  const cached = tagsCache.get(directory)
  if (cached) return cached

  const { data: tags, error } = await supabase
    .from('posts')
    .select('tags')
    .eq('type', directory.replace('_', ''))
    .not('tags', 'is', null)

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  const allTags = tags
    .flatMap(post => post.tags || [])
    .filter((tag, index, self) => self.indexOf(tag) === index)

  tagsCache.set(directory, allTags)
  return allTags
}
