import fs from 'fs'
import pkg from 'globby'
const { globby } = pkg

const generateSitemap = async () => {
  // Get all pages except the ones starting with /api, /404, or /500
  const pages = await globby([
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/_*.{js,jsx,ts,tsx}',
    '!pages/api',
    '!pages/404.{js,jsx,ts,tsx}',
    '!pages/500.{js,jsx,ts,tsx}',
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace(/\.(js|jsx|ts|tsx)$/, '')
            .replace(/\/index$/, '')

          return `
            <url>
              <loc>https://biobase.studio${path}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
