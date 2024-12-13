import { Doc } from '@/.contentlayer/generated'
import Link from 'next/link'
import { forwardRef } from 'react'

import { ExternalLink } from 'lucide-react'
import { Button } from 'ui'
import { cn } from 'ui/src/lib/utils/cn'
import Image from 'next/image'

const SourcePanel = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { doc: Doc }>(
  ({ doc, children, ...props }, ref) => {
    const ShadcnPanel = () => {
      if (doc.source?.shadcn) {
        return (
          <div
            className={cn(
              'bg-surface-75/50 border flex items-center p-3 px-5 gap-6 first:rounded-t-md last:rounded-b-md',
              props.className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
              </svg>
              <span className="hidden font-bold sm:inline-block">shadcn/ui</span>
            </div>
            <span className="text-foreground-light text-sm">
              This component is based on ui.shadcn
            </span>
          </div>
        )
      }
    }

    const VaulPanel = () => {
      if (doc.source?.vaul) {
        return (
          <div
            className={cn(
              'bg-surface-75/50 border flex items-center p-3 px-5 gap-6 first:rounded-t-md last:rounded-b-md',
              props.className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src="https://avatars.githubusercontent.com/u/36730035?s=48&v=4"
                alt="Vaul"
                className="h-6 w-6 rounded-full"
              />
              <span className="hidden font-bold text-xs sm:inline-block">vaul</span>
            </div>
            <span className="text-foreground-light text-xs">
              This component is based on vaul by emilkowalski
            </span>
          </div>
        )
      }
    }

    const ReactAccesibleTreeViewPanel = () => {
      if (doc.source?.reactAccessibleTreeview) {
        return (
          <div
            className={cn(
              'bg-surface-75/50 border flex items-center p-3 px-5 gap-6 first:rounded-t-md last:rounded-b-md justify-between',
              props.className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src="https://avatars.githubusercontent.com/u/14020024?v=4"
                alt="dgreene1"
                className="h-6 w-6 rounded-full"
              />
              <span className="hidden text-xs font-bold sm:inline-block">
                react-accessible-treeview
              </span>
              <span className="text-foreground-light text-xs">
                Component based on react-accessible-treeview by dgreene1
              </span>
            </div>
            {doc.source?.reactAccessibleTreeview?.doc && (
              <div className="flex items-center gap-2 justify-end">
                <Button
                  type="outline"
                  className="rounded-full"
                  icon={<ExternalLink className="text-foreground-muted" strokeWidth={1} />}
                >
                  <Link
                    href={doc.source.reactAccessibleTreeview.doc}
                    target="_blank"
                    className="text-xs"
                  >
                    Documentation
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )
      }
    }

    const InputOtp = () => {
      if (doc.source?.inputOtp) {
        return (
          <div
            className={cn(
              'bg-surface-75/50 border flex items-center p-3 px-5 gap-6 first:rounded-t-md last:rounded-b-md',
              props.className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src="https://avatars.githubusercontent.com/u/10366880?s=48&v=4"
                alt="inputOtp"
                className="h-6 w-6 rounded-full"
              />
              <span className="hidden font-bold text-xs sm:inline-block">input-otp</span>
            </div>
            <span className="text-foreground-light text-xs">
              This component is based on input-otp by guilhermerodz
            </span>
          </div>
        )
      }
    }

    const RadixPanel = () => {
      if (doc.source?.radix) {
        return (
          <div
            className={cn(
              'bg-surface-75/50 border flex items-center p-3 px-5 gap-6 first:rounded-t-md last:rounded-b-md',
              props.className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src="https://avatars.githubusercontent.com/u/75042455?s=48&v=4"
                alt="Radix"
                className="h-6 w-6 rounded-full"
              />
              <span className="hidden font-bold sm:inline-block">Radix UI</span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <span className="text-foreground-light text-xs">This component uses Radix UI</span>
              {doc.source?.radix?.doc && (
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    type="outline"
                    className="rounded-full"
                    icon={<ExternalLink className="text-foreground-muted" strokeWidth={1} />}
                  >
                    <Link
                      href={doc.source.radix.doc}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs"
                    >
                      Documentation
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
      }
    }

    return (
      <div className="flex flex-col -space-y-px">
        <RadixPanel />
        <VaulPanel />
        <InputOtp />
        <ReactAccesibleTreeViewPanel />
        {/* <ShadcnPanel /> */}
      </div>
    )
  }
)

SourcePanel.displayName = 'SourcePanel'

export { SourcePanel }
