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
  limit = 5,
  offset = 0,
  categories
}: GetSortedPostsParams) {
  const postsDirectory = path.join(process.cwd(), 'content', directory)
  
  // 1. 先只获取文件列表
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
  
  // 2. 获取文件状态（不读取内容）
  const fileStats = fileNames.map(fileName => ({
    name: fileName,
    stats: fs.statSync(path.join(postsDirectory, fileName))
  }))
  
  // 3. 排序并限制数量
  const selectedFiles = fileStats
    .sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime())
    .slice(0, limit + offset)
    .map(file => file.name)
  
  // 4. 只处理选中的文件
  const posts = selectedFiles.map(fileName => {
    const slug = fileName.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      category: data.category,
      url: `/${directory.replace('_', '')}/${slug}`
    }
  })

  return posts

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

export const getStaticPaths = async () => {
  return {
    paths: [], // 不预生成任何路径
    fallback: 'blocking' // 使用服务器端渲染
  }
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
