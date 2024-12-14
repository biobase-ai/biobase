const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { generateReadingTime } = require('./helpers')

const FILENAME_SUBSTRING = 11

const getDatesFromFileName = (filename) => {
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

const getSortedPosts = ({
  directory,
  limit,
  tags,
  categories,
  currentPostSlug,
}) => {
  //Finding directory named "blog" from the current working directory of Node.
  const postDirectory = path.join(process.cwd(), directory)

  //Reads all the files in the post directory
  const fileNames = fs.readdirSync(postDirectory)

  const allPosts = fileNames
    .map((filename) => {
      const slug =
        directory === '_blog' || directory === '_events'
          ? filename.replace('.mdx', '').substring(FILENAME_SUBSTRING)
          : filename.replace('.mdx', '')

      const fullPath = path.join(postDirectory, filename)

      //Extracts contents of the MDX file
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      const formattedDate = new Date(data.date).toLocaleDateString('en-IN', options)

      const readingTime = generateReadingTime(content)

      const url = `/${directory.replace('_', '')}/${slug}`
      const contentPath = `/${directory.replace('_', '')}/${slug}`

      const frontmatter = {
        ...data,
        formattedDate,
        readingTime,
        url: url,
        path: contentPath,
      }

      return {
        slug,
        ...frontmatter,
      }
    })
    // avoid reading content if it's the same post as the one the user is already reading
    .filter((post) => post.slug !== currentPostSlug)

  let sortedPosts = [...allPosts]

  sortedPosts = sortedPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (categories) {
    sortedPosts = sortedPosts.filter((post) => {
      const found = categories?.some((tag) => post.categories?.includes(tag))
      return found
    })
  }

  if (tags) {
    sortedPosts = sortedPosts.filter((post) => {
      const found = tags.some((tag) => post.tags?.includes(tag))
      return found
    })
  }

  if (limit) sortedPosts = sortedPosts.slice(0, limit)

  return sortedPosts
}

const getAllTags = (directory) => {
  const posts = getSortedPosts({ directory })
  let tags = []

  posts.map((post) => {
    post.tags?.map((tag) => {
      if (!tags.includes(tag)) return tags.push(tag)
    })
  })

  return tags
}

const getAllCategories = (directory) => {
  const posts = getSortedPosts({ directory })
  let categories = []

  posts.map((post) => {
    post.categories?.map((tag) => {
      if (!categories.includes(tag)) return categories.push(tag)
    })
  })

  return categories
}

const getAllPostSlugs = (directory) => {
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

const getPostdata = async (slug, directory) => {
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

module.exports = {
  getSortedPosts,
  getAllTags,
  getAllCategories,
  getAllPostSlugs,
  getPostdata,
  getDatesFromFileName,
}
