import { LOCAL_STORAGE_KEYS, useBreakpoint } from 'common'
import { AnimatePresence, motion } from 'framer-motion'
import { startCase } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
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

  const allCategories = [
    'all',
    'product',
    'company',
    'postgres',
    'developers',
    'engineering',
    'launch-week',
  ]

  const handleReplaceRouter = useCallback(() => {
    if (!searchTerm && category !== 'all') {
      router.query.category = category
      router.replace(router, undefined, { shallow: true, scroll: false })
    }
  }, [searchTerm, category, router])

  const handlePosts = useCallback(() => {
    const shiftedBlogs = [...blogs]
    shiftedBlogs.shift()

    handleReplaceRouter()

    setBlogs(
      category === 'all'
        ? shiftedBlogs
        : blogs.filter((post) => {
            const found = post.categories?.includes(category)
            return found
          })
    )
  }, [blogs, category, handleReplaceRouter, setBlogs])

  const handleSearchByText = useCallback((text: string) => {
    setSearchTerm(text)
    if (searchParams?.has('q')) {
      router.replace('/blog', undefined, { shallow: true, scroll: false })
    }
    router.replace(`/blog?q=${text}`, undefined, { shallow: true, scroll: false })
    if (text.length < 1) router.replace('/blog', undefined, { shallow: true, scroll: false })

    const matches = blogs.filter((post) => {
      const found =
        post.tags?.join(' ').replaceAll('-', ' ').includes(text.toLowerCase()) ||
        post.title?.toLowerCase().includes(text.toLowerCase()) ||
        post.author?.includes(text.toLowerCase())
      return found
    })

    setBlogs(matches)
  }, [blogs, router, searchParams, setBlogs])

  useEffect(() => {
    if (!q) {
      handlePosts()
    }
  }, [category, q, handlePosts])

  useEffect(() => {
    if (q) {
      handleSearchByText(q)
    }
  }, [q, handleSearchByText])

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

  const handleSetCategory = (category: string) => {
    if (searchTerm) {
      handlePosts()
      setSearchTerm('')
    }
    setCategory(category)
    category === 'all'
      ? router.replace('/blog', undefined, { shallow: true, scroll: false })
      : router.replace(`/blog?category=${category}`, undefined, {
          shallow: true,
          scroll: false,
        })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (activeCategory) setCategory('all')
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
              <DropdownMenuTrigger asChild>
                <Button
                  type="outline"
                  className="w-full min-w-[200px] flex justify-between items-center py-2"
                >
                  {!activeCategory ? 'All Posts' : startCase(activeCategory?.replaceAll('-', ' '))}
                  <ChevronDown size={16} className="ml-2" />
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
              type="outline"
              className={cn(
                'py-2',
                (category === 'all' && !activeCategory) || category === activeCategory
                  ? 'bg-brand-600 hover:bg-brand-600 text-white'
                  : ''
              )}
              onClick={() => handleSetCategory(category)}
            >
              {category === 'all' ? 'All Posts' : startCase(category.replaceAll('-', ' '))}
            </Button>
          ))}
        </div>
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {!showSearchInput && (
          <Button
            type="outline"
            className="lg:hidden"
            onClick={() => setShowSearchInput(true)}
          >
            <Search size={16} />
          </Button>
        )}

        {showSearchInput && (
          <div className="relative flex w-full items-center lg:w-60">
            <Input
              autoFocus={isMobile}
              type="search"
              placeholder="Search blog posts..."
              className="w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isMobile && (
              <div className="absolute right-10">
                <X size={16} onClick={() => setShowSearchInput(false)} className="cursor-pointer" />
              </div>
            )}
            <div className="absolute right-3">
              <Search size={16} className="text-foreground-light" />
            </div>
          </div>
        )}

        <Button
          type="outline"
          className="hidden lg:flex"
          onClick={handleViewSelection}
        >
          {isList ? <Grid size={16} /> : <AlignJustify size={16} />}
        </Button>

        <Button
          type="outline"
          className="lg:hidden"
          onClick={handleViewSelection}
        >
          {isList ? <Grid size={16} /> : <AlignJustify size={16} />}
        </Button>
      </div>
    </div>
  )
}

export default BlogFilters
