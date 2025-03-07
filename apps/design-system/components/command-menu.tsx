'use client'

import { DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { CircleIcon, LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { docsConfig } from '@/config/docs'
import { cn } from '@/lib/utils'
import { Button } from 'ui'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/components/shadcn/ui/command'

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        type="outline"
        className={cn(
          `relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-foreground-muted shadow-none sm:pr-12 md:w-40 lg:w-64
            hover:border-foreground-muted hover:bg-surface-100 hover:text-foreground-lighter
          `
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search Design System...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-surface-200 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-foreground-light">
          <span className="text-sm">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-foreground-muted [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandPrimitive.Input placeholder="Type a command or search..." />
          <CommandPrimitive.List>
            <CommandPrimitive.Empty>No results found.</CommandPrimitive.Empty>
            {docsConfig.sidebarNav.map((group) => (
              <CommandPrimitive.Group key={group.title} heading={group.title}>
                {group.items.map((navItem) => (
                  <CommandPrimitive.Item
                    key={navItem.href}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.href as string))
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <CircleIcon className="h-3 w-3" strokeWidth={1} />
                    </div>
                    {navItem.title}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
            <CommandPrimitive.Separator />
            <CommandPrimitive.Group heading="Theme">
              <CommandPrimitive.Item onSelect={() => runCommand(() => setTheme('light'))}>
                <SunIcon className="mr-2 h-4 w-4" strokeWidth={1} />
                Light
              </CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => runCommand(() => setTheme('dark'))}>
                <MoonIcon className="mr-2 h-4 w-4" strokeWidth={1} />
                Dark
              </CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => runCommand(() => setTheme('classic-dark'))}>
                <MoonIcon className="mr-2 h-4 w-4" strokeWidth={1} />
                Classic dark
              </CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => runCommand(() => setTheme('system'))}>
                <LaptopIcon className="mr-2 h-4 w-4" strokeWidth={1} />
                System
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </CommandDialog>
    </>
  )
}
