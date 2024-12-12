import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  bundle: true,
  minify: true,
  injectStyle: true,
  loader: {
    '.css': 'css'
  }
})
