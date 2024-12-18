interface BlogPost {
  url: string
  title: string
  description?: string
}

interface MenuItem {
  title: string
  url?: string
  hasDropdown?: boolean
  dropdown?: React.ReactNode
}

interface Menu {
  primaryNav: MenuItem[]
  secondaryNav: MenuItem[]
}

export const getMenu = (latestBlogPosts: BlogPost[] = []): Menu => {
  const blogPosts = Array.isArray(latestBlogPosts) ? latestBlogPosts : []
  
  return {
    primaryNav: [
      {
        title: 'Product',
        hasDropdown: true,
        dropdown: (
          <div className="grid gap-4 p-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/features" className="block text-sm text-muted-foreground hover:text-foreground">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="/database" className="block text-sm text-muted-foreground hover:text-foreground">
                    Database
                  </a>
                </li>
                <li>
                  <a href="/auth" className="block text-sm text-muted-foreground hover:text-foreground">
                    Authentication
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Latest from the blog</h3>
              <ul className="space-y-2">
                {blogPosts.map((post) => (
                  <li key={post.url}>
                    <a
                      href={post.url}
                      className="block text-sm text-muted-foreground hover:text-foreground"
                    >
                      {post.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/blog" className="block text-sm text-muted-foreground hover:text-foreground">
                    View all posts →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: 'Developers',
        url: '/developers',
      },
      {
        title: 'Pricing',
        url: '/pricing',
      },
      {
        title: 'Blog',
        url: '/blog',
      },
    ],
    secondaryNav: [
      {
        title: 'Sign In',
        url: 'https://biobase.studio/dashboard',
      },
      {
        title: 'Start Project',
        url: 'https://biobase.studio/dashboard',
      },
    ],
  }
} 