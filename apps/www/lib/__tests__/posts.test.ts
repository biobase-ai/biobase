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
      expect(posts.length).toBeLessThanOrEqual(9) // Default limit
      
      if (posts.length > 0) {
        expect(posts[0]).toHaveProperty('slug')
        expect(posts[0]).toHaveProperty('title')
        expect(posts[0]).toHaveProperty('description')
        expect(posts[0]).toHaveProperty('date')
        expect(posts[0]).toHaveProperty('category')
        expect(posts[0]).toHaveProperty('url')
      }
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
      const category = 'engineering' // Replace with an actual category
      const posts = await getSortedPosts({
        directory: '_blog',
        categories: [category]
      })
      
      posts.forEach(post => {
        expect(post.category).toBe(category)
      })
    })
  })

  describe('getPostData', () => {
    it('should fetch single post data', async () => {
      // First get a post slug from the list
      const posts = await getSortedPosts({ directory: '_blog', limit: 1 })
      if (posts.length === 0) {
        console.warn('No posts found to test getPostData')
        return
      }

      const slug = posts[0].slug
      const post = await getPostData(slug, '_blog')
      
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
      
      // Check for duplicates
      const uniqueCategories = [...new Set(categories)]
      expect(categories.length).toBe(uniqueCategories.length)
    })

    it('should use cache on subsequent calls', async () => {
      const firstCall = await getAllCategories('_blog')
      const secondCall = await getAllCategories('_blog')
      
      expect(secondCall).toEqual(firstCall)
      // Note: This is a simple test, in reality you might want to spy on the supabase calls
    })
  })

  describe('getTotalPostCount', () => {
    it('should return total post count', async () => {
      const count = await getTotalPostCount('_blog')
      expect(typeof count).toBe('number')
      expect(count).toBeGreaterThanOrEqual(0)
    })

    it('should return filtered count by category', async () => {
      const categories = await getAllCategories('_blog')
      if (categories.length === 0) {
        console.warn('No categories found to test getTotalPostCount')
        return
      }

      const category = categories[0]
      const count = await getTotalPostCount('_blog', category)
      expect(typeof count).toBe('number')
      expect(count).toBeGreaterThanOrEqual(0)
    })
  })

  describe('getAllTags', () => {
    it('should fetch unique tags', async () => {
      const tags = await getAllTags('_blog')
      expect(Array.isArray(tags)).toBe(true)
      
      // Check for duplicates
      const uniqueTags = [...new Set(tags)]
      expect(tags.length).toBe(uniqueTags.length)
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
    // Clear all caches before each test
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
    // Note: In a real test, you'd want to verify that a new Supabase call was made
  })
}) 