import { LOCAL_STORAGE_KEYS, useBreakpoint } from 'common'
import { AnimatePresence, motion } from 'framer-motion'
import { startCase } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useKey } from 'react-use'
import type { BlogView } from '~/pages/blog'
import type { BlogPostPreview } from '~/lib/blog-service'

import { AlignJustify, ChevronDown, Grid, Search, X } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  cn,
} from 'ui'

interface Props {
  blogs: BlogPostPreview[]
  setBlogs: (blogs: BlogPostPreview[]) => void
  view: BlogView
  setView: (view: BlogView) => void
}

/**
 * ✅ search via text input
 * ✅ update searchTerm when deleting text input
 * ✅ search via q param
 * ✅ search via category if no q param
 * ✅ search via category and reset q param if present
 */

export const BlogFilters = ({ blogs, setBlogs, view, setView }: Props) => {
  const { BLOG_VIEW } = LOCAL_STORAGE_KEYS
  const isList = view === 'list'
  const [category, setCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams?.get('q')
  const activeCategory = searchParams?.get('category')
  const isMobile = useBreakpoint(1023)
  const is2XL = useBreakpoint(1535)

  // Use hard-coded categories here as they:
  // - serve as a reference
  // - are easier to reorder
  const allCategories = [
    'all',
    'product',
    'company',
    'postgres',
    'developers',
    'engineering',
    'launch-week',
  ]

  useEffect(() => {
    if (!q) {
      handlePosts()
    }
  }, [category])

  useEffect(() => {
    if (q) {
      handleSearchByText(q)
    }
  }, [q])

  const handleReplaceRouter = () => {
    if (!searchTerm && category !== 'all') {
      router.query.category = category
      router.replace(router, undefined, { shallow: true, scroll: false })
    }
  }

  const handlePosts = () => {
    // construct an array of blog posts
    // not inluding the first blog post
    const shiftedBlogs = [...blogs]
    shiftedBlogs.shift()

    handleReplaceRouter()

    setBlogs(
      category === 'all'
        ? shiftedBlogs
        : blogs.filter((post: any) => {
            const found = post.categories?.includes(category)
            return found
          })
    )
  }

  useKey('Escape', () => handleSearchByText(''))

  useEffect(() => {
    setShowSearchInput(!isMobile)
  }, [isMobile])

  useEffect(() => {
    if (router.isReady && q) {
      setSearchTerm(q)
    }
    if (router.isReady && activeCategory && activeCategory !== 'all') {
      setCategory(activeCategory)
    }
  }, [activeCategory, router.isReady, q])

  const handleSearchByText = (text: string) => {
    setSearchTerm(text)
    searchParams?.has('q') && router.replace('/blog', undefined, { shallow: true, scroll: false })
    router.replace(`/blog?q=${text}`, undefined, { shallow: true, scroll: false })
    if (text.length < 1) router.replace('/blog', undefined, { shallow: true, scroll: false })

    const matches = blogs.filter((post: any) => {
      const found =
        post.tags?.join(' ').replaceAll('-', ' ').includes(text.toLowerCase()) ||
        post.title?.toLowerCase().includes(text.toLowerCase()) ||
        post.author?.includes(text.toLowerCase())
      return found
    })

    setBlogs(matches)
  }

  const handleSetCategory = (category: string) => {
    searchTerm && handlePosts()
    searchTerm && setSearchTerm('')
    setCategory(category)
    category === 'all'
      ? router.replace('/blog', undefined, { shallow: true, scroll: false })
      : router.replace(`/blog?category=${category}`, undefined, {
          shallow: true,
          scroll: false,
        })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    activeCategory && setCategory('all')
    handleSearchByText(event.target.value)
  }

  const handleViewSelection = () => {
    const newValue = view === 'list' ? 'grid' : 'list'
    setView(newValue)
    localStorage.setItem(BLOG_VIEW, newValue)
  }

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <AnimatePresence mode="wait">
        {!showSearchInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex lg:hidden"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <Button
                  type="outline"
                  className="w-full min-w-[200px] flex justify-between items-center py-2"
                >
                  {!activeCategory ? 'All Posts' : startCase(activeCategory?.replaceAll('-', ' '))}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[200px] p-0"
              >
                {allCategories.map((category: string) => (
                  <DropdownMenuItem
                    key={`item-${category}`}
                    onClick={() => handleSetCategory(category)}
                    className={cn(
                      'cursor-pointer py-2 px-3',
                      (category === 'all' && !activeCategory) || category === activeCategory
                        ? 'text-brand-600'
                        : ''
                    )}
                  >
                    {category === 'all' ? 'All Posts' : startCase(category.replaceAll('-', ' '))}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
        <div className="hidden lg:flex flex-wrap items-center flex-grow gap-2">
          {allCategories.map((category: string) => (
            <Button
              key={category}
              type={
                category === 'all' && !searchTerm && !activeCategory
                  ? 'default'
                  : (category === 'all' && !searchTerm && !activeCategory) ||
                    category === activeCategory
                  ? 'primary'
                  : 'outline'
              }
              onClick={() => handleSetCategory(category)}
            >
              {category === 'all' ? 'All Posts' : startCase(category.replaceAll('-', ' '))}
            </Button>
          ))}
        </div>

        {showSearchInput ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex flex-1 items-center gap-3"
          >
            <Input
              autoFocus={!isMobile}
              placeholder="Search blog posts"
              onChange={handleSearchChange}
              value={searchTerm}
              icon={<Search className="text-foreground-lighter" />}
              actions={
                searchTerm && (
                  <Button
                    type="text"
                    onClick={() => handleSearchByText('')}
                    className="px-1 mr-1"
                  >
                    <X />
                  </Button>
                )
              }
            />
            {isMobile && (
              <Button type="outline" onClick={() => setShowSearchInput(false)}>
                Cancel
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex items-center gap-2"
          >
            <Button
              type="outline"
              onClick={() => setShowSearchInput(true)}
              className="lg:hidden"
            >
              <Search />
            </Button>
            <Button
              type="outline"
              onClick={handleViewSelection}
              className={cn('hidden lg:flex', is2XL ? 'px-3' : 'px-2')}
            >
              {isList ? <Grid /> : <AlignJustify />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        type="default"
        title={isList ? 'Grid View' : 'List View'}
        onClick={handleViewSelection}
        className="h-full p-1.5"
      >
        {isList ? <Grid /> : <AlignJustify />}
      </Button>
    </div>
  )
}

export default BlogFilters
