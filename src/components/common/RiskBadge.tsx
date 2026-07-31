import { Badge } from '@/components/ui/badge'
import { RISK_CONFIG } from '@/lib/status-config'
import type { RiskLevel } from '@/types'
import { cn } from '@/lib/utils'

interface RiskBadgeProps {
  risk: RiskLevel
  className?: string
}

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  const config = RISK_CONFIG[risk]
  const Icon = config.icon
  return (
    <Badge variant={config.variant} className={cn(className)}>
      <Icon className="size-3" aria-hidden="true" />
      {config.label}
    </Badge>
  )
}
