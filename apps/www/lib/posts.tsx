import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateReadingTime } from './helpers'
import PostTypes from '~/types/post'

type Directories = '_blog' | '_case-studies' | '_customers' | '_alternatives' | '_events'

// substring amount for file names
// based on YYYY-MM-DD format
export const FILENAME_SUBSTRING = 11

type GetSortedPostsParams = {
  directory: Directories
  limit?: number
  offset?: number
  tags?: string[]
  runner?: unknown
  currentPostSlug?: string
  categories?: any
}

export function getSortedPosts({
  directory,
  limit = 5, // 减少到5篇
  offset = 0,
  categories
}: GetSortedPostsParams) {
  const postsDirectory = path.join(process.cwd(), 'content', directory)
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .sort((a, b) => {
      const aStats = fs.statSync(path.join(postsDirectory, a))
      const bStats = fs.statSync(path.join(postsDirectory, b))
      return bStats.mtime.getTime() - aStats.mtime.getTime()
    })
    .slice(0, 10) // 减少文件扫描数量

  const allPostsData = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      // 极简化返回字段
      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        description: data.description?.slice(0, 80), // 减少描述长度到80字符
        url: `/${directory.replace('_', '')}/${slug}`,
      }
    })
    .filter(post => {
      if (categories?.length > 0) {
        return categories.includes(post.category)
      }
      return true
    })
    .slice(offset, offset + limit)

  return allPostsData
}
// Get Slugs
export const getAllPostSlugs = (directory: Directories) => {
  //Finding directory named "blog" from the current working directory of Node.
  const postDirectory = path.join(process.cwd(), directory)

  const fileNames = fs.readdirSync(postDirectory)

  const files = fileNames.map((filename) => {
    const dates =
      directory === '_blog'
        ? getDatesFromFileName(filename)
        : {
            year: '2021',
            month: '04',
            day: '02',
          }

    return {
      params: {
        ...dates,
        slug: filename
          .replace('.mdx', '')
          .substring(directory === '_blog' || directory === '_events' ? FILENAME_SUBSTRING : 0),
      },
    }
  })

  return files
}

export const getPostdata = async (slug: string, directory: string) => {
  /**
   * All files are mdx files
   */
  const fileType = 'mdx'
  slug = slug + '.' + fileType

  /**
   * Return full directory
   */
  const postDirectory = path.join(process.cwd(), directory)
  const folderfiles = fs.readdirSync(postDirectory)

  /**
   * Check if the file exists in the directory
   * This should return 1 result
   *
   * this is so slugs like 'blog-post.mdx' will work
   * even if the mdx file is date namednamed like '2022-01-01-blog-post.mdx'
   */
  const found = folderfiles.filter((x) => x.includes(slug))[0]

  const fullPath = path.join(postDirectory, found)
  const postContent = fs.readFileSync(fullPath, 'utf8')
  return postContent
}

export const getAllCategories = (directory: Directories) => {
  const posts = getSortedPosts({ directory })
  const categories: Set<string> = new Set()

  posts.forEach((post: any) => {
    if (post.categories && Array.isArray(post.categories)) {
      post.categories.forEach((tag: string) => {
        if (typeof tag === 'string' && tag.trim()) {
          categories.add(tag.trim().toLowerCase())
        }
      })
    }
  })

  // Convert Set back to sorted array
  return Array.from(categories).sort((a, b) => a.localeCompare(b))
}

export const getAllTags = (directory: Directories) => {
  const posts = getSortedPosts({ directory })
  let tags: any = []

  posts.map((post: any) => {
    post.tags?.map((tag: string) => {
      if (!tags.includes(tag)) return tags.push(tag)
    })
  })

  return tags
}

const getDatesFromFileName = (filename: string) => {
  // extract YYYY, MM, DD from post name
  const year = filename.substring(0, 4)
  const month = filename.substring(5, 7)
  const day = filename.substring(8, 10)

  return {
    year,
    month,
    day,
  }
}
