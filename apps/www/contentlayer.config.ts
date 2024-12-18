// Load environment variables first
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import type { DocumentTypes } from 'contentlayer/generated'
import { FILENAME_SUBSTRING } from './lib/posts'

// Create a mock client for when credentials are missing
const createMockClient = () => ({
  from: () => ({
    select: () => Promise.resolve({
      data: [],
      error: null
    })
  })
})

// Initialize Supabase client with environment variables
const initSupabaseClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not found in contentlayer config, using mock client')
      return createMockClient()
    }

    const { createClient } = require('@supabase/supabase-js')
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    return createMockClient()
  }
}

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    author: { type: 'string', required: true },
    author_url: { type: 'string', required: false },
    author_title: { type: 'string', required: false },
    author_image_url: { type: 'string', required: false },
    date: { type: 'string', required: true },
    description: { type: 'string', required: true },
    categories: { type: 'list', of: { type: 'string' }, required: true },
    image: { type: 'string', required: false },
    launchweek: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    title: { type: 'string', required: true },
    thumb: { type: 'string', required: false },
    toc_depth: { type: 'number', required: false },
    video: { type: 'string', required: false },
    youtubeHero: { type: 'string', required: false },
    published_at: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => {
        const slug = post._raw.flattenedPath.replace('.mdx', '').substring(FILENAME_SUBSTRING)
        return `/blog/${slug}`
      },
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('.mdx', '').substring(FILENAME_SUBSTRING)
    }
  },
}))

const contentLayerConfig = makeSource({
  contentDirPath: '_blog',
  documentTypes: [BlogPost],
  onSuccess: async () => {
    console.log('Contentlayer build successful')
    process.exit(0)
  },
  onError: async (error) => {
    console.error('Contentlayer build failed:', error)
    process.exit(1)
  }
})

export default contentLayerConfig
