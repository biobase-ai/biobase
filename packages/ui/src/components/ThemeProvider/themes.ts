export interface Theme {
  name: string
  value: string
}

export const themes = [
  { name: 'System', value: 'system' }, // Switches between dark and light
  { name: 'Dark', value: 'dark' }, // Classic Biobase dark
  { name: 'Classic dark', value: 'classic-dark' }, // Deep Dark Biobase dark
  { name: 'Light', value: 'light' }, // Classic Biobase light
]
