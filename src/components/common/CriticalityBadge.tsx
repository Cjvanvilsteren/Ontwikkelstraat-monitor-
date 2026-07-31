import { Badge } from '@/components/ui/badge'
import { CRITICALITY_CONFIG } from '@/lib/status-config'
import type { Criticality } from '@/types'
import { cn } from '@/lib/utils'

interface CriticalityBadgeProps {
  criticality: Criticality
  className?: string
}

export function CriticalityBadge({ criticality, className }: CriticalityBadgeProps) {
  const config = CRITICALITY_CONFIG[criticality]
  const Icon = config.icon
  return (
    <Badge variant={config.variant} className={cn(className)}>
      <Icon className="size-3" aria-hidden="true" />
      {config.label}
    </Badge>
  )
}
