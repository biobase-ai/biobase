'use client'

import * as React from 'react'
import { Column } from '@tanstack/react-table'
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from 'ui'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <SortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <SortAsc className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start" className="z-50">
            <DropdownMenu.Item onSelect={() => column.toggleSorting(false)}>
              <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => column.toggleSorting(true)}>
              <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
