const config = require('config/tailwind.config')
const path = require('path')

// Get absolute paths to packages
const packagesDir = path.resolve(__dirname, '../../packages')
const uiDir = path.join(packagesDir, 'ui')
const uiPatternsDir = path.join(packagesDir, 'ui-patterns')

module.exports = config({
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.tsx',
    './content/**/*.{ts,tsx,mdx}',
    './docs/**/*.{tsx,mdx}',
    './features/**/*.{ts,tsx,mdx}',
    './layouts/**/*.tsx',
    './pages/**/*.{tsx,mdx}',
    path.join(uiDir, 'src/**/!(*.test|*.spec|*.d).{tsx,ts,js}'),
    path.join(uiPatternsDir, 'src/**/!(*.test|*.spec|*.d).{tsx,ts,js}'),
  ],
  plugins: [
    function ({ addUtilities, addVariant }) {
      addUtilities({
        // prose (tailwind typography) helpers
        // useful for removing margins in prose styled sections
        '.prose--remove-p-margin p': {
          margin: '0',
        },
      })
    },
    require('@tailwindcss/container-queries'),
  ],
})
