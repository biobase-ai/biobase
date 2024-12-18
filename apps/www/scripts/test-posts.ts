import {
  getSortedPosts,
  getPostData,
  getAllCategories,
  getTotalPostCount,
  getAllTags
} from '../lib/posts'

async function testPosts() {
  console.log('\n=== Testing Posts Utility Functions ===\n')

  try {
    // Test getSortedPosts
    console.log('Testing getSortedPosts...')
    const posts = await getSortedPosts({ directory: '_blog' })
    console.log(`✅ Found ${posts.length} posts`)
    if (posts.length > 0) {
      console.log('Sample post:', {
        title: posts[0].title,
        category: posts[0].category,
        url: posts[0].url
      })
    }

    // Test getPostData
    if (posts.length > 0) {
      console.log('\nTesting getPostData...')
      const post = await getPostData(posts[0].slug, '_blog')
      console.log('✅ Successfully fetched post data')
      console.log('Post content length:', post?.content?.length || 0)
    }

    // Test getAllCategories
    console.log('\nTesting getAllCategories...')
    const categories = await getAllCategories('_blog')
    console.log(`✅ Found ${categories.length} categories:`, categories)

    // Test category post count
    if (categories.length > 0) {
      console.log('\nTesting getTotalPostCount with category...')
      const categoryCount = await getTotalPostCount('_blog', categories[0])
      console.log(`✅ Found ${categoryCount} posts in category '${categories[0]}'`)
    }

    // Test total post count
    console.log('\nTesting getTotalPostCount (all posts)...')
    const totalCount = await getTotalPostCount('_blog')
    console.log(`✅ Total posts: ${totalCount}`)

    // Test getAllTags
    console.log('\nTesting getAllTags...')
    const tags = await getAllTags('_blog')
    console.log(`✅ Found ${tags.length} tags:`, tags)

    // Test caching
    console.log('\nTesting caching...')
    console.time('First call')
    await getAllCategories('_blog')
    console.timeEnd('First call')

    console.time('Second call (cached)')
    await getAllCategories('_blog')
    console.timeEnd('Second call (cached)')

    console.log('\n✅ All tests completed successfully!')
  } catch (error) {
    console.error('\n❌ Test failed:', error)
  }
}

// Run the tests
testPosts() 