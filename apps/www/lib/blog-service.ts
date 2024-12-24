import biobase from './biobaseMisc'
import { allPosts } from 'contentlayer/generated'

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
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await biobase.storage.listBuckets()
    if (listError) throw listError

    const bucketExists = buckets?.some(b => b.name === 'blog-json')
    if (!bucketExists) {
      console.warn('Blog storage bucket not found, falling back to local content')
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking blog bucket:', error)
    return false
  }
}

async function getPublicStorageUrl(filename: string) {
  const { data } = await biobase.storage.from('blog-json').getPublicUrl(filename)
  return data.publicUrl
}

async function fetchBlogPostJson(filename: string) {
  try {
    const publicUrl = await getPublicStorageUrl(filename)
    const response = await fetch(publicUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return {
      ...data,
      slug: data.url?.replace('/blog/', '') || data._raw?.flattenedPath || filename.replace('.mdx.json', ''),
      date: data.date || data.publishedAt,
      body: {
        raw: data.body?.raw || data.content || ''
      }
    }
  } catch (error) {
    console.error(`Error fetching blog post ${filename}:`, error)
    return null
  }
}

async function fetchBlogIndex() {
  try {
    const publicUrl = await getPublicStorageUrl('_index.json')
    const response = await fetch(publicUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching blog index:', error)
    return { blogPosts: [] }
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
    image: post.image,
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
    image: post.image,
    tags: post.tags,
    categories: post.categories,
    content: post.body?.raw || post.content || ''
  }
}
