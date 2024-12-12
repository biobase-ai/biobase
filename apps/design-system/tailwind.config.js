const baseConfig = require('../../packages/config/tailwind.config')

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './registry/**/*.{js,ts,jsx,tsx}',
    // purge styles from grid library
    './../../packages/ui/src/**/*.{tsx,ts,js}',
    // Exclude node_modules
    '!**/node_modules/**',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      maxWidth: {
        site: '128rem',
      },
    },
  },
}
