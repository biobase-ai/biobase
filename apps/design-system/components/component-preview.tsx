'use client'

import * as React from 'react'
import { Index } from '../registry/default'
import dynamic from 'next/dynamic'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { RegistryEntry } from '../registry/schema'

import {
  Button,
  CollapsibleContent_Shadcn_,
  CollapsibleTrigger_Shadcn_,
  Collapsible_Shadcn_,
  cn,
} from 'ui'
import { useConfig } from '@/hooks/use-config'
import { CopyWithClassNames } from '@/components/copy-button'
import {
  Tabs_Shadcn_ as Tabs,
  TabsContent_Shadcn_ as TabsContent,
  TabsList_Shadcn_ as TabsList,
  TabsTrigger_Shadcn_ as TabsTrigger,
} from 'ui'

import { ChevronRight, Expand } from 'lucide-react'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: 'center' | 'start' | 'end'
  peekCode?: boolean
  showGrid?: boolean
  showDottedGrid?: boolean
  wide?: boolean
}

interface ComponentEntry extends Omit<RegistryEntry, 'component'> {
  component: () => Promise<any>
  code?: string
}

interface IndexType {
  default: Record<string, ComponentEntry>
}

const registry = Index as unknown as IndexType

export function ComponentPreview({
  name,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = 'center',
  peekCode = false,
  showGrid = false,
  showDottedGrid = false,
  wide = false,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const Preview = React.useMemo(() => {
    const component = registry.default[name]?.component
    if (!component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found in style{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {config.style}
          </code>
          .
        </p>
      )
    }

    const Component = dynamic(component, {
      ssr: false,
      loading: () => null,
    })

    return <Component />
  }, [name])

  const codeString = React.useMemo(() => {
    return registry.default[name]?.code || null
  }, [name])

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
      {...props}
    >
      <Collapsible_Shadcn_
        open={!isCollapsed}
        onOpenChange={setIsCollapsed}
      >
        <div className="flex items-center justify-between">
          <CollapsibleTrigger_Shadcn_ asChild>
            <Button className="h-8 p-2">
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  !isCollapsed && 'rotate-90'
                )}
              />
            </Button>
          </CollapsibleTrigger_Shadcn_>
          <div className="flex items-center space-x-2">
            {extractedClassNames ? (
              <CopyWithClassNames
                value={codeString || ''}
                classNames={extractedClassNames}
              />
            ) : null}
            {codeString ? (
              <Button
                className="h-8 w-8"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Expand className="h-4 w-4" />
                <span className="sr-only">Expand code</span>
              </Button>
            ) : null}
          </div>
        </div>
        <CollapsibleContent_Shadcn_>
          <div
            className={cn(
              'flex justify-center p-8',
              {
                'bg-grid': showGrid,
                'bg-grid-dot': showDottedGrid,
              },
              align === 'center' && 'items-center',
              align === 'start' && 'items-start',
              align === 'end' && 'items-end',
              wide && 'w-full'
            )}
          >
            {Preview}
          </div>
        </CollapsibleContent_Shadcn_>
      </Collapsible_Shadcn_>
      {codeString ? (
        <Collapsible_Shadcn_
          open={isExpanded}
          onOpenChange={setIsExpanded}
        >
          <CollapsibleContent_Shadcn_>
            {peekCode ? (
              <div className="border-t">{codeString}</div>
            ) : (
              <TabsPrimitive.Root defaultValue="code" className="relative mt-6 w-full">
                <TabsPrimitive.List className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsPrimitive.Trigger
                    value="code"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Code
                  </TabsPrimitive.Trigger>
                </TabsPrimitive.List>
                <TabsPrimitive.Content value="code" className="rounded-none">
                  <div className="flex flex-col space-y-4">
                    <div className="w-full min-w-0">
                      <pre className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-muted p-4">
                        <code className="relative rounded bg-muted p-0 font-mono text-sm">
                          {codeString}
                        </code>
                      </pre>
                    </div>
                  </div>
                </TabsPrimitive.Content>
              </TabsPrimitive.Root>
            )}
          </CollapsibleContent_Shadcn_>
        </Collapsible_Shadcn_>
      ) : null}
    </div>
  )
}
