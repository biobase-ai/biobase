import biobase from './biobaseMisc'

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

async function fetchBlogIndex() {
  const { data, error } = await biobase.storage
    .from('blog-json')
    .download('_index.json')

  if (error) throw error

  const text = await data.text()
  return JSON.parse(text)
}

async function fetchBlogPostJson(filename: string) {
  const { data, error } = await biobase.storage
    .from('blog-json')
    .download(filename)

  if (error) throw error

  const text = await data.text()
  return JSON.parse(text)
}

export async function fetchBlogPosts(
  page = 1, 
  pageSize = 10,
  category?: string
): Promise<PaginatedBlogPosts> {
  const { blogPosts } = await fetchBlogIndex()
  const start = (page - 1) * pageSize
  
  // Fetch all posts in parallel
  const posts = await Promise.all(
    blogPosts.map((filename: string) => fetchBlogPostJson(filename))
  )

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
  const { blogPosts } = await fetchBlogIndex()
  
  // Find the post file by slug
  for (const filename of blogPosts) {
    const post = await fetchBlogPostJson(filename)
    if (post.slug === slug) {
      return {
        title: post.title,
        description: post.description || '',
        slug: post.slug,
        publishedAt: post.published_at || post.date,
        author: post.author || 'Biobase Team',
        image: post.image,
        tags: post.tags,
        categories: post.categories,
        content: post.body.raw
      }
    }
  }

  return null
}
