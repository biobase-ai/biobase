import { Alert, AlertDescription, AlertTitle } from '@ui/components/shadcn/ui/alert'
import { ReactNode } from 'react'

interface CalloutProps {
  icon?: string
  title?: string
  children?: ReactNode
}

export function Callout({ title, children, icon, ...props }: CalloutProps) {
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
