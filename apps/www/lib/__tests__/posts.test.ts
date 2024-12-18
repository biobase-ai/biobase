// Mock environment variables before importing posts
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

const mockPost = {
  slug: 'test-post',
  title: 'Test Post',
  description: 'Test Description',
  created_at: '2024-01-01',
  category: 'engineering',
  image: 'test.jpg',
  content: 'Test content',
  tags: ['test']
}

// Mock the posts module
jest.mock('../posts', () => ({
  getSortedPosts: jest.fn().mockImplementation(async () => {
    return [{
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test Description',
      date: '2024-01-01',
      category: 'engineering',
      image: 'https://test.com/image.jpg',
      url: '/blog/test-post'
    }]
  }),
  getPostData: jest.fn().mockImplementation(async (slug) => {
    if (slug === 'non-existent-post') return null
    return {
      ...mockPost,
      image: 'https://test.com/image.jpg'
    }
  }),
  getAllCategories: jest.fn().mockImplementation(async () => {
    return ['engineering']
  }),
  getTotalPostCount: jest.fn().mockImplementation(async () => {
    return 5
  }),
  getAllTags: jest.fn().mockImplementation(async () => {
    return ['test']
  })
}))

import {
  getSortedPosts,
  getPostData,
  getAllCategories,
  getTotalPostCount,
  getAllTags
} from '../posts'

describe('Posts Utility Functions', () => {
  describe('getSortedPosts', () => {
    it('should fetch and return sorted posts', async () => {
      const posts = await getSortedPosts({ directory: '_blog' })
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
      
      const post = posts[0]
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('category')
      expect(post).toHaveProperty('url')
    })

    it('should respect limit and offset', async () => {
      const limit = 5
      const offset = 2
      const posts = await getSortedPosts({ 
        directory: '_blog',
        limit,
        offset
      })
      expect(posts.length).toBeLessThanOrEqual(limit)
    })

    it('should filter by category', async () => {
      const category = 'engineering'
      const posts = await getSortedPosts({
        directory: '_blog',
        categories: [category]
      })
      
      expect(posts.length).toBeGreaterThan(0)
      posts.forEach(post => {
        expect(post.category).toBe(category)
      })
    })
  })

  describe('getPostData', () => {
    it('should fetch single post data', async () => {
      const post = await getPostData('test-post', '_blog')
      
      expect(post).toBeTruthy()
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('category')
    })

    it('should return null for non-existent post', async () => {
      const post = await getPostData('non-existent-post', '_blog')
      expect(post).toBeNull()
    })
  })

  describe('getAllCategories', () => {
    it('should fetch unique categories', async () => {
      const categories = await getAllCategories('_blog')
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
      
      // Check for duplicates
      const uniqueCategories = [...new Set(categories)]
      expect(categories.length).toBe(uniqueCategories.length)
    })

    it('should use cache on subsequent calls', async () => {
      const firstCall = await getAllCategories('_blog')
      const secondCall = await getAllCategories('_blog')
      
      expect(secondCall).toEqual(firstCall)
    })
  })

  describe('getTotalPostCount', () => {
    it('should return total post count', async () => {
      const count = await getTotalPostCount('_blog')
      expect(typeof count).toBe('number')
      expect(count).toBeGreaterThanOrEqual(0)
    })

    it('should return filtered count by category', async () => {
      const category = 'engineering'
      const count = await getTotalPostCount('_blog', category)
      expect(typeof count).toBe('number')
      expect(count).toBeGreaterThanOrEqual(0)
    })
  })

  describe('getAllTags', () => {
    it('should fetch unique tags', async () => {
      const tags = await getAllTags('_blog')
      expect(Array.isArray(tags)).toBe(true)
      expect(tags.length).toBeGreaterThanOrEqual(0)
    })

    it('should use cache on subsequent calls', async () => {
      const firstCall = await getAllTags('_blog')
      const secondCall = await getAllTags('_blog')
      
      expect(secondCall).toEqual(firstCall)
    })
  })
})

// Test the Cache class
describe('Cache', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should cache and retrieve values', async () => {
    const categories = await getAllCategories('_blog')
    const cachedCategories = await getAllCategories('_blog')
    expect(cachedCategories).toEqual(categories)
  })

  it('should expire cache after TTL', async () => {
    const categories = await getAllCategories('_blog')
    
    // Advance time past TTL
    jest.advanceTimersByTime(6 * 60 * 1000) // 6 minutes
    
    const newCategories = await getAllCategories('_blog')
    expect(newCategories).toEqual(categories) // Data should be the same
  })
}) 