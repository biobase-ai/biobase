import path from 'path'
import fs from 'fs'

export function getComponents(dir: string) {
  const components: Record<string, { component: any; code?: string }> = {}
  const componentsDir = path.join(process.cwd(), 'registry', dir)

  if (!fs.existsSync(componentsDir)) {
    console.warn(`Directory not found: ${componentsDir}`)
    return components
  }

  // Read all files in the components directory
  const files = fs.readdirSync(componentsDir)

  files.forEach((file) => {
    if (file.endsWith('.tsx')) {
      const name = path.basename(file, '.tsx')
      const filePath = path.join(componentsDir, file)
      const code = fs.readFileSync(filePath, 'utf8')
      
      try {
        // Import the component dynamically
        components[name] = {
          component: () => import(filePath).then(mod => mod.default),
          code
        }
      } catch (error) {
        console.warn(`Failed to load component ${name}: ${error.message}`)
      }
    }
  })

  return components
}
