// get reading time
// returns :string
const generateReadingTime = (text) => {
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} minute read`
}

// Helps with the TypeScript issue where filtering doesn't narrows undefined nor null types, check https://github.com/microsoft/TypeScript/issues/16069
function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined
}

function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase()
}

function isMobileOrTablet() {
  // https://stackoverflow.com/a/8876069/114157
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  return viewportWidth < 1200
}

// Convert numbers or strings to pixel value
// Helpful for styled-jsx when using a prop
// height: ${toPixels(height)}; (supports height={20} and height="20px")
const toPixels = (value) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

const isBrowser = typeof window !== 'undefined'

const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim()

/**
 * Fixes Safari dates sorting bug
 */
function sortDates(a, b, direction = 'desc') {
  const dateA = new Date(a)
  const dateB = new Date(b)

  if (direction === 'asc') {
    return dateA.getTime() - dateB.getTime()
  }

  return dateB.getTime() - dateA.getTime()
}

module.exports = {
  generateReadingTime,
  isNotNullOrUndefined,
  capitalize,
  isMobileOrTablet,
  toPixels,
  isBrowser,
  stripEmojis,
  sortDates
}
