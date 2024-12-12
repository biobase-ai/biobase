const newColors = require('./new-colors')

module.exports = {
  ...newColors,
  // 保留一些原有的工具类颜色
  "colors-black": {
    cssVariable: "var(--core-colors-black)",
    value: "hsl(0, 0%, 0%)"
  },
  "colors-white": {
    cssVariable: "var(--core-colors-white)",
    value: "hsl(0, 0%, 100%)"
  }
}
