import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface TokenIconProps extends LucideProps {
  name: string
}

export function TokenIcon({ name, ...props }: TokenIconProps) {
  const Icon = (Icons as any)[name]
  if (!Icon) return <span>{name.slice(0, 1)}</span>
  return <Icon {...props} />
}
