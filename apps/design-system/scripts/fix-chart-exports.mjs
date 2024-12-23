import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const CHART_DIR = '../registry/default/block';

async function fixChartFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  
  // Skip if file doesn't export description
  if (!content.includes('export const description =')) {
    return;
  }

  // Extract the description
  const descMatch = content.match(/export const description = ['"]([^'"]+)['"]/);
  if (!descMatch) {
    return;
  }

  // Remove the export const description line
  let newContent = content.replace(/export const description = ['"][^'"]+['"][\r\n]*/g, '');

  // Add description before default export
  const description = `const description = '${descMatch[1]}';\n\n`;
  
  // Add description to Component
  const componentDescriptionAssignment = '\nComponent.description = description;\n';

  // Insert description before export default
  newContent = newContent.replace(
    /export default function Component/,
    `${description}export default function Component`
  );

  // Add Component.description assignment before the last closing brace
  newContent = newContent.replace(
    /}[\s]*$/,
    `}${componentDescriptionAssignment}`
  );

  await writeFile(filePath, newContent);
}

async function main() {
  const chartDir = new URL(CHART_DIR, import.meta.url).pathname;
  const files = await readdir(chartDir);
  
  for (const file of files) {
    if (file.endsWith('.tsx') && file.startsWith('chart-')) {
      const filePath = join(chartDir, file);
      await fixChartFile(filePath);
      console.log(`Fixed ${file}`);
    }
  }
}

main().catch(console.error);
