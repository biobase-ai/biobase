/* eslint-disable import/no-extraneous-dependencies */
import { base64SVG } from '@supabase/build-icons'

export default ({ componentName, iconName, children, getSvg, deprecated }) => {
  const svgContents = getSvg()
  const svgBase64 = base64SVG(svgContents)

  return `
import createBiobaseIcon from '../createBiobaseIcon';

/**
 * @component @name ${componentName}
 * @description Biobase SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64})
 *
 * @param {Object} props - Biobase icons props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 * ${deprecated ? '@deprecated' : ''}
 */
const ${componentName} = createBiobaseIcon('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`
}
