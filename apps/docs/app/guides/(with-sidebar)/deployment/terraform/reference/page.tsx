import { codeBlock } from 'common-tags'
import { Check, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import {
  CodeBlock,
  Heading,
  PopoverContent_Shadcn_,
  PopoverTrigger_Shadcn_,
  Popover_Shadcn_,
} from 'ui'

import { genGuideMeta } from '~/features/docs/GuidesMdx.utils'
import { GuideTemplate, newEditLink } from '~/features/docs/GuidesMdx.template'
import { fetchRevalidatePerDay } from '~/features/helpers.fetch'
import { TabPanel, Tabs } from '~/features/ui/Tabs'
import {
  terraformDocsBranch,
  terraformDocsDocsDir,
  terraformDocsOrg,
  terraformDocsRepo,
} from '../terraformConstants'

const meta = {
  title: 'Terraform Provider reference',
  subtitle: 'Resources and data sources available through the Terraform Provider',
}

const generateMetadata = genGuideMeta(() => ({
  pathname: '/guides/platform/terraform/reference',
  meta,
}))

function ProviderSettings({ schema }: { schema: any }) {
  const attributes = schema.block.attributes

  const example = codeBlock`
    provider "biobase" {
        ${Object.keys(attributes).map(
          (attribute) =>
            `${attribute} = ${attributes[attribute].type === 'string' ? `""` : '<value>'}`
        )}
    }
  `

  return (
    <section aria-labelledby="provider-settings" className="prose max-w-none">
      <Heading tag="h2">Provider settings</Heading>
      <p>
        Use these settings to configure your Biobase provider and authenticate to your Biobase
        project.
      </p>
      <Heading tag="h3">Example usage</Heading>
      <CodeBlock className="not-prose">{example}</CodeBlock>
      <Heading tag="h3">Details</Heading>
      {/* extra div because width restriction doesn't work on table itself */}
      <div className="w-full overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Description</th>
              <th>Type</th>
              <th>Optional</th>
              <th>Sensitive</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(schema.block.attributes).map((attribute) => (
              <tr key={attribute}>
                <td>{attribute}</td>
                <td>
                  <ReactMarkdown>{attributes[attribute].description}</ReactMarkdown>
                </td>
                <td>{attributes[attribute].type}</td>
                <td className="align-middle">
                  {attributes[attribute].optional && (
                    <>
                      <Check className="ml-[2.5ch]" />
                      <span className="sr-only">true</span>
                    </>
                  )}
                </td>
                <td className="align-middle">
                  {attributes[attribute].sensitive && (
                    <>
                      <Check className="ml-[2.5ch]" />
                      <span className="sr-only">true</span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Resources({ schema }: { schema: any }) {
  return (
    <section aria-labelledby="resources" className="prose max-w-none">
      <Heading tag="h2">Resources</Heading>
      <p>You can configure these resources using the Biobase Terraform provider:</p>
      <Tabs>
        {Object.keys(schema).map((resource) => (
          <TabPanel id={resource} label={resource}>
            <Heading tag="h4">Example usage</Heading>
            <CodeBlock className="not-prose">{codeBlock`
                resource "${resource}" "<label>" {
                    ${Object.keys(schema[resource].block.attributes)
                      .filter((attribute) => !schema[resource].block.attributes[attribute].computed)
                      .map(
                        (attribute) =>
                          `${attribute} = ${
                            schema[resource].block.attributes[attribute].type === 'string'
                              ? `""`
                              : '<value>'
                          }`
                      )}
                }
            `}</CodeBlock>
            <Heading tag="h4">Details</Heading>
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Optional</th>
                  <th>Read-only</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(schema[resource].block.attributes).map((attribute) => (
                  <tr key={attribute}>
                    <td>
                      <code>{attribute}</code>
                    </td>
                    <td>
                      <ReactMarkdown>
                        {schema[resource].block.attributes[attribute].description}
                      </ReactMarkdown>
                    </td>
                    <td>
                      {schema[resource].block.attributes[attribute].type ?? (
                        <Popover_Shadcn_>
                          <PopoverTrigger_Shadcn_ asChild>
                            <button className="flex items-center justify-between gap-2">
                              Nested type
                              <PlusCircle size={14} className="shrink-0" />
                            </button>
                          </PopoverTrigger_Shadcn_>
                          <PopoverContent_Shadcn_ className="max-h-[50vh] overflow-auto">
                            <ul>
                              {Object.keys(
                                schema[resource].block.attributes[attribute].nested_type.attributes
                              ).map((nestedAttribute) => (
                                <li key={nestedAttribute}>
                                  {nestedAttribute}
                                  <ul>
                                    <li>
                                      <ReactMarkdown className="*:!m-0">
                                        {
                                          schema[resource].block.attributes[attribute].nested_type
                                            .attributes[nestedAttribute].description
                                        }
                                      </ReactMarkdown>
                                    </li>
                                    <li>
                                      {schema[resource].block.attributes[attribute].nested_type
                                        .attributes[nestedAttribute].type ?? 'nested type'}
                                    </li>
                                    {schema[resource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].required && <li>Required</li>}
                                    {schema[resource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].optional && <li>Optional</li>}
                                    {schema[resource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].computed && <li>Read-only</li>}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </PopoverContent_Shadcn_>
                        </Popover_Shadcn_>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[resource].block.attributes[attribute].required && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[resource].block.attributes[attribute].optional && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[resource].block.attributes[attribute].computed && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}

function DataSources({ schema }: { schema: any }) {
  return (
    <section aria-labelledby="data-sources" className="prose max-w-none">
      <Heading tag="h2">Data sources</Heading>
      <p>You can read these resources using the Biobase Terraform provider:</p>
      <Tabs>
        {Object.keys(schema).map((dataSource) => (
          <TabPanel id={dataSource} label={dataSource}>
            <Heading tag="h4">Example usage</Heading>
            <CodeBlock className="not-prose">{codeBlock`
                  resource "${dataSource}" "all" {
                      ${Object.keys(schema[dataSource].block.attributes)
                        .filter(
                          (attribute) => !schema[dataSource].block.attributes[attribute].computed
                        )
                        .map(
                          (attribute) =>
                            `${attribute} = ${
                              schema[dataSource].block.attributes[attribute].type === 'string'
                                ? `""`
                                : '<value>'
                            }`
                        )}
                  }
              `}</CodeBlock>
            <Heading tag="h4">Details</Heading>
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Optional</th>
                  <th>Read-only</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(schema[dataSource].block.attributes).map((attribute) => (
                  <tr key={attribute}>
                    <td>
                      <code>{attribute}</code>
                    </td>
                    <td>
                      <ReactMarkdown>
                        {schema[dataSource].block.attributes[attribute].description}
                      </ReactMarkdown>
                    </td>
                    <td>
                      {schema[dataSource].block.attributes[attribute].type ?? (
                        <Popover_Shadcn_>
                          <PopoverTrigger_Shadcn_ asChild>
                            <button className="flex items-center justify-between gap-2">
                              Nested type
                              <PlusCircle size={14} />
                            </button>
                          </PopoverTrigger_Shadcn_>
                          <PopoverContent_Shadcn_ className="max-h-[50vh] overflow-auto">
                            {schema[dataSource].block.attributes[attribute].nested_type
                              .nesting_mode === 'set' && 'Array of:'}
                            <ul>
                              {Object.keys(
                                schema[dataSource].block.attributes[attribute].nested_type
                                  .attributes
                              ).map((nestedAttribute) => (
                                <li key={nestedAttribute}>
                                  {nestedAttribute}
                                  <ul>
                                    <li>
                                      <ReactMarkdown className="*:!m-0">
                                        {
                                          schema[dataSource].block.attributes[attribute].nested_type
                                            .attributes[nestedAttribute].description
                                        }
                                      </ReactMarkdown>
                                    </li>
                                    <li>
                                      {schema[dataSource].block.attributes[attribute].nested_type
                                        .attributes[nestedAttribute].type ?? 'nested type'}
                                    </li>
                                    {schema[dataSource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].required && <li>Required</li>}
                                    {schema[dataSource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].optional && <li>Optional</li>}
                                    {schema[dataSource].block.attributes[attribute].nested_type
                                      .attributes[nestedAttribute].computed && <li>Read-only</li>}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </PopoverContent_Shadcn_>
                        </Popover_Shadcn_>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[dataSource].block.attributes[attribute].required && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[dataSource].block.attributes[attribute].optional && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                    <td className="align-middle">
                      {schema[dataSource].block.attributes[attribute].computed && (
                        <>
                          <Check className="ml-[2.5ch]" />
                          <span className="sr-only">true</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}

const getFallbackSchema = () => ({
  provider_schemas: {
    'registry.terraform.iobiobase-ai/biobase': {
      provider: {
        block: {
          attributes: {
            api_key: { 
              type: 'string',
              description: 'The API key used to authenticate with Biobase.',
              required: true,
            },
            project_ref: { 
              type: 'string',
              description: 'The reference ID of your Biobase project.',
              required: true,
            },
            database_password: { 
              type: 'string',
              description: 'The password for the database.',
              required: true,
            },
          },
        },
      },
      resource_schemas: {
        'biobase_project': {
          block: {
            attributes: {
              id: {
                type: 'string',
                description: 'The unique identifier for the project.',
                computed: true,
              },
              name: {
                type: 'string',
                description: 'The name of the project.',
                required: true,
              },
              organization_id: {
                type: 'string',
                description: 'The ID of the organization the project belongs to.',
                required: true,
              },
              region: {
                type: 'string',
                description: 'The region where the project is hosted.',
                required: true,
              },
            },
          },
        },
        'biobase_database': {
          block: {
            attributes: {
              id: {
                type: 'string',
                description: 'The unique identifier for the database.',
                computed: true,
              },
              project_id: {
                type: 'string',
                description: 'The ID of the project this database belongs to.',
                required: true,
              },
              name: {
                type: 'string',
                description: 'The name of the database.',
                required: true,
              },
            },
          },
        },
      },
      data_source_schemas: {
        'biobase_project': {
          block: {
            attributes: {
              id: {
                type: 'string',
                description: 'The unique identifier of the project.',
                required: true,
              },
              name: {
                type: 'string',
                description: 'The name of the project.',
                computed: true,
              },
              organization_id: {
                type: 'string',
                description: 'The ID of the organization the project belongs to.',
                computed: true,
              },
              region: {
                type: 'string',
                description: 'The region where the project is hosted.',
                computed: true,
              },
            },
          },
        },
      },
    },
  },
})

/**
 * Fetch JSON schema from external repo
 */
const getSchema = async () => {
  try {
    // Try fetching from different possible schema locations
    const possiblePaths = [
      `${terraformDocsDocsDir}/schema.json`,
      `${terraformDocsDocsDir}/provider-schema.json`,
      `provider-schema.json`,
      `schema.json`
    ]

    for (const path of possiblePaths) {
      try {
        const response = await fetchRevalidatePerDay(
          `https://raw.githubusercontent.com/${terraformDocsOrg}/${terraformDocsRepo}/${terraformDocsBranch}/${path}`
        )
        
        if (!response.ok) continue

        const text = await response.text()
        if (text.trim().startsWith('{')) {  // Quick check if it looks like JSON
          try {
            const schema = JSON.parse(text)
            if (schema.provider_schemas) {
              return { schema }
            }
          } catch (err) {
            console.error(`Failed to parse schema from ${path}:`, err)
          }
        }
      } catch (err) {
        console.error(`Failed to fetch schema from ${path}:`, err)
      }
    }

    console.error('Failed to fetch valid Terraform schema from any location')
    return { schema: getFallbackSchema() }
  } catch (err) {
    console.error('Error in schema fetching:', err)
    return { schema: getFallbackSchema() }
  }
}

const TerraformReferencePage = async () => {
  const { schema } = await getSchema()

  const editLink = newEditLink('biobase/terraform-provider-biobase')

  // If we have a fallback schema, show a warning
  const isFallback =
    !schema.provider_schemas['registry.terraform.iobiobase-ai/biobase'].resource_schemas

  return (
    <GuideTemplate meta={meta} editLink={editLink}>
      {isFallback && (
        <div className="bg-amber-100 dark:bg-amber-900 rounded p-4 mb-6">
          <p className="text-amber-900 dark:text-amber-100">
            ⚠️ The Terraform Provider documentation is currently unavailable. Showing basic provider
            configuration only. Please check back later for the complete reference.
          </p>
        </div>
      )}
      The Terraform Provider provides access to{' '}
      <Link
        href="https://developer.hashicorp.com/terraform/language/resources"
        rel="noopener noreferrer"
      >
        resources
      </Link>{' '}
      and{' '}
      <Link
        href="https://developer.hashicorp.com/terraform/language/data-sources"
        rel="noreferrer noopener"
      >
        data sources
      </Link>
      . Resources are infrastructure objects, such as a Biobase project, that you can declaratively
      configure. Data sources are sources of information about your Biobase instances.
      <ProviderSettings
        schema={schema.provider_schemas['registry.terraform.iobiobase-ai/biobase'].provider}
      />
      <Resources
        schema={schema.provider_schemas['registry.terraform.iobiobase-ai/biobase'].resource_schemas}
      />
      <DataSources
        schema={
          schema.provider_schemas['registry.terraform.iobiobase-ai/biobase'].data_source_schemas
        }
      />
    </GuideTemplate>
  )
}

export default TerraformReferencePage
export { generateMetadata }
