import { promises as fs } from 'fs'
import path from 'path'

const COMPONENTS_DIR = path.join(process.cwd(), 'components/ui')
const REGISTRY_DIR = path.join(process.cwd(), 'registry/default/block')

async function generateComponents() {
  try {
    // Create registry directory if it doesn't exist
    await fs.mkdir(REGISTRY_DIR, { recursive: true })

    // Read all components from ui directory
    const files = await fs.readdir(COMPONENTS_DIR)
    
    for (const file of files) {
      if (file.endsWith('.tsx')) {
        const componentName = file.replace('.tsx', '')
        const componentContent = await fs.readFile(path.join(COMPONENTS_DIR, file), 'utf8')
        
        // Create component file in registry
        const registryFile = path.join(REGISTRY_DIR, file)
        await fs.writeFile(registryFile, componentContent)
        
        console.log(`Generated registry file for ${componentName}`)
      }
    }
    
    console.log('Successfully generated all component registry files')
  } catch (error) {
    console.error('Error generating components:', error)
  }
}

generateComponents()
