import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with environment variables
const initSupabaseClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not found, using mock client')
      return createMockClient()
    }

    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    return createMockClient()
  }
}

// Create a mock client for fallback
const createMockClient = () => {
  const mockResponse = {
    data: [],
    count: 0,
    error: null
  }

  const mockQuery = {
    eq: () => mockQuery,
    order: () => mockQuery,
    range: () => mockQuery,
    not: () => mockQuery,
    single: () => mockResponse,
    data: [],
    count: 0,
    error: null
  }

  return {
    from: () => ({
      select: (columns: string, options?: { count?: string; head?: boolean }) => mockQuery,
      count: () => mockQuery
    }),
    storage: {
      from: () => ({
        getPublicUrl: () => ({
          data: { publicUrl: '' }
        })
      })
    }
  }
}

// Initialize the client
const supabase = initSupabaseClient()

// Constants
export const FILENAME_SUBSTRING = 11 // based on YYYY-MM-DD format

// Types
export type Directories = '_blog' | '_alternatives' | '_customers' | '_partners' | '_events'

// Cache for post counts
const countCache = new Map<string, number>()

// Helper function to get total post count
export async function getTotalPostCount(directory: Directories, category?: string) {
  const cacheKey = `${directory}:${category || 'all'}`
  const cached = countCache.get(cacheKey)
  if (cached !== undefined) return cached

  try {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
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
  } catch (error) {
    console.error('Error getting post count:', error)
    return 0
  }
}

// Helper function to get all categories
export async function getAllCategories(directory: Directories): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('category')
      .eq('type', directory.replace('_', ''))
      .not('category', 'is', null)

    if (error) {
      console.error('Error getting categories:', error)
      return []
    }

    const categories = [...new Set(data.map(post => post.category))]
    return categories.filter(Boolean).sort()
  } catch (error) {
    console.error('Error getting categories:', error)
    return []
  }
}

// Helper function to get sorted posts
export async function getSortedPosts(params: {
  directory: Directories
  category?: string
  page?: number
  limit?: number
}) {
  const { directory, category, page = 1, limit = 10 } = params

  try {
    let query = supabase
      .from('posts')
      .select('*')
      .eq('type', directory.replace('_', ''))
      .order('published_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (page && limit) {
      const start = (page - 1) * limit
      const end = start + limit - 1
      query = query.range(start, end)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getting posts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}
