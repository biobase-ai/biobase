import { readFile, writeFile } from 'fs/promises'
import globPkg from 'glob'
import path from 'path'

const { glob } = globPkg

async function updateChartFiles() {
  try {
    const chartFiles = await globPkg.sync('registry/default/block/chart-*.tsx', {
      cwd: process.cwd(),
      absolute: true,
    })

    console.log(`Found ${chartFiles.length} chart files`)

    for (const file of chartFiles) {
      let content = await readFile(file, 'utf8')

      // Skip if the file already uses ResponsiveWrapper
      if (content.includes('ResponsiveWrapper')) {
        console.log(`Skipping ${path.basename(file)} - already using ResponsiveWrapper`)
        continue
      }

      // Replace ResponsiveContainer import
      content = content.replace(
        /import {([^}]*)ResponsiveContainer,([^}]*)} from 'recharts'/,
        "import {$1$2} from 'recharts'\nimport { ResponsiveWrapper } from './utils/chart-components'"
      )

      // Replace ResponsiveContainer usage with ResponsiveWrapper
      content = content.replace(/<ResponsiveContainer/g, '<ResponsiveWrapper')
      content = content.replace(/<\/ResponsiveContainer>/g, '</ResponsiveWrapper>')

      await writeFile(file, content, 'utf8')
      console.log(`Updated ${path.basename(file)}`)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

updateChartFiles()
