import path from 'path'

// Import components directly
export function getComponents(dir: string) {
  const components: Record<string, { component: any; code?: string }> = {}

  try {
    // Return a dynamic import function that imports the index file
    return {
      [dir]: {
        component: () => import(`./default/${dir}/index`),
        code: '',
      },
    }
  } catch (error) {
    console.warn(`Failed to load components from ${dir}:`, error)
    return components
  }
}
