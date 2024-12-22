import { allPosts, Post } from 'contentlayer/generated'

export interface BlogPost {
  title: string
  description: string
  slug: string
  publishedAt: string
  author: string
  image?: string
  tags?: string[]
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
}

export interface PaginatedBlogPosts {
  posts: BlogPostPreview[]
  total: number
  page: number
  pageSize: number
}

export async function fetchBlogPosts(page = 1, pageSize = 10): Promise<PaginatedBlogPosts> {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.published_at || a.date)
    const dateB = new Date(b.published_at || b.date)
    return dateB.getTime() - dateA.getTime()
  })

  const paginatedPosts = sortedPosts.slice(start, end).map((post: Post) => ({
    title: post.title,
    description: post.description || '',
    slug: post.slug,
    publishedAt: post.published_at || post.date,
    author: post.author || 'Biobase Team',
    image: post.image,
    tags: post.tags,
  }))

  return {
    posts: paginatedPosts,
    total: allPosts.length,
    page,
    pageSize,
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = allPosts.find((post: Post) => post.slug === slug)
  
  if (!post) {
    return null
  }

  return {
    title: post.title,
    description: post.description || '',
    slug: post.slug,
    publishedAt: post.published_at || post.date,
    author: post.author || 'Biobase Team',
    image: post.image,
    tags: post.tags,
    content: post.body.raw,
  }
}
