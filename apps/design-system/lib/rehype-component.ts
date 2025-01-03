import fs from 'fs'
import path from 'path'
import { UnistNode, UnistTree } from 'types/unist'
import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'

import { Index } from '../__registry__'
import { styles } from '../registry/styles'

// import { parse } from 'react-docgen'

// import * as reactDocgenTypescript from 'react-docgen-typescript'

// import { Column, IColumnProps } from './sample-component'
import React from 'react' // ComponentType

function inspectComponentProps<T>(component: React.ComponentType<T>): void {
  // Assert the component's props type
  const defaultProps = (component as React.ComponentType<any>).defaultProps || {}

  // console.log('Component props:')
  // console.log('----------------')

  for (const propName in defaultProps) {
    const propType = typeof defaultProps[propName]
    console.log(`${propName}: ${propType}`)
  }
}

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // Safely handle ComponentSource
      if (node.name === 'ComponentSource') {
        const name = getNodeAttributeByName(node, 'name')?.value as string
        const fileName = getNodeAttributeByName(node, 'fileName')?.value as string | undefined
        const srcPath = getNodeAttributeByName(node, 'src')?.value as string | undefined

        if (!name && !srcPath) {
          return
        }

        try {
          for (const style of styles) {
            let src: string

            if (srcPath) {
              src = srcPath
            } else {
              const component = Index[style.name]?.[name]
              if (!component) {
                console.warn(`Component ${name} not found in style ${style.name}`)
                continue
              }

              src = fileName
                ? component.files.find((file: string) => {
                    return file.endsWith(`${fileName}.tsx`) || file.endsWith(`${fileName}.ts`)
                  }) || component.files[0]
                : component.files[0]
            }

            // Read the source file.
            const filePath = path.join(process.cwd(), src)
            let source = fs.readFileSync(filePath, 'utf8')

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u('element', {
                tagName: 'pre',
                properties: {
                  __src__: src,
                  __style__: style.name,
                },
                attributes: [
                  {
                    name: 'styleName',
                    type: 'mdxJsxAttribute',
                    value: style.name,
                  },
                ],
                children: [
                  u('element', {
                    tagName: 'code',
                    properties: {
                      className: ['language-tsx'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            )
          }
        } catch (error) {
          console.error('Error processing ComponentSource:', error)
        }
      }

      // Safely handle ComponentPreview
      if (node.name === 'ComponentPreview') {
        const name = getNodeAttributeByName(node, 'name')?.value as string

        if (!name) {
          return
        }

        try {
          for (const style of styles) {
            const component = Index[style.name]?.[name]
            if (!component) {
              console.warn(`Component ${name} not found in style ${style.name}`)
              continue
            }

            const src = component.files[0]

            // Read the source file.
            const filePath = path.join(process.cwd(), src)
            let source = fs.readFileSync(filePath, 'utf8')

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u('element', {
                tagName: 'pre',
                properties: {
                  __src__: src,
                  __style__: style.name,
                },
                attributes: [
                  {
                    name: 'styleName',
                    type: 'mdxJsxAttribute',
                    value: style.name,
                  },
                ],
                children: [
                  u('element', {
                    tagName: 'code',
                    properties: {
                      className: ['language-tsx'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            )
          }
        } catch (error) {
          console.error('Error processing ComponentPreview:', error)
        }
      }

      if (node.name === 'CodeFragment') {
        const name = getNodeAttributeByName(node, 'name')?.value as string

        if (!name) {
          return null
        }

        try {
          for (const style of styles) {
            const component = Index[style.name][name]
            // console.log('GOT HERE')
            const src = component.files[0]

            // Read the source file.
            const filePath = path.join(process.cwd(), src)
            let source = fs.readFileSync(filePath, 'utf8')

            // Replace imports.
            // TODO: Use @swc/core and a visitor to replace this.
            // For now a simple regex should do.
            source = source.replaceAll(`@/registry/${style.name}/`, '@/components/')
            source = source.replaceAll('export default', 'export')

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u('element', {
                tagName: 'pre',
                properties: {
                  __src__: src,
                },
                children: [
                  u('element', {
                    tagName: 'code',
                    properties: {
                      className: ['language-tsx'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            )
          }
        } catch (error) {
          console.error(error)
        }
      }

      // if (node.name === "ComponentExample") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Example component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )

      //   const extractClassname = getNodeAttributeByName(
      //     node,
      //     "extractClassname"
      //   )
      //   if (
      //     extractClassname &&
      //     typeof extractClassname.value !== "undefined" &&
      //     extractClassname.value !== "false"
      //   ) {
      //     // Extract className from string
      //     // TODO: Use @swc/core and a visitor to extract this.
      //     // For now, a simple regex should do.
      //     const values = source.match(/className="(.*)"/)
      //     const className = values ? values[1] : ""

      //     // Add the className as a jsx prop so we can pass it to the copy button.
      //     node.attributes?.push({
      //       name: "extractedClassNames",
      //       type: "mdxJsxAttribute",
      //       value: className,
      //     })

      //     // Add a pre element with the className only.
      //     node.children?.push(
      //       u("element", {
      //         tagName: "pre",
      //         properties: {},
      //         children: [
      //           u("element", {
      //             tagName: "code",
      //             properties: {
      //               className: ["language-tsx"],
      //             },
      //             children: [
      //               {
      //                 type: "text",
      //                 value: className,
      //               },
      //             ],
      //           }),
      //         ],
      //       })
      //     )
      //   }
      // }

      // if (node.name === "ComponentSource") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Source component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )
      // }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attr: any) => attr.name === name)
}

function getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, 'src')?.value as string

  if (!src) {
    return null
  }

  // Read the source file.
  const filePath = path.join(process.cwd(), src)
  console.log('filePath', filePath)
  const source = fs.readFileSync(filePath, 'utf8')

  return source
}
