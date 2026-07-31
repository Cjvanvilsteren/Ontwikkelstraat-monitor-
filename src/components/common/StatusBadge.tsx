import { Badge } from '@/components/ui/badge'
import {
  ENVIRONMENT_STATUS_CONFIG,
  ISSUE_STATUS_CONFIG,
  RELEASE_STATUS_CONFIG,
} from '@/lib/status-config'
import type { EnvironmentStatus, IssueStatus, ReleaseStatus } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: EnvironmentStatus | ReleaseStatus | IssueStatus
  className?: string
}

function isEnvironmentStatus(status: string): status is EnvironmentStatus {
  return status in ENVIRONMENT_STATUS_CONFIG
}

function isIssueStatus(status: string): status is IssueStatus {
  return status in ISSUE_STATUS_CONFIG
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = isEnvironmentStatus(status)
    ? ENVIRONMENT_STATUS_CONFIG[status]
    : isIssueStatus(status)
      ? ISSUE_STATUS_CONFIG[status]
      : RELEASE_STATUS_CONFIG[status]
  const Icon = config.icon
  return (
    <Badge variant={config.variant} className={cn(className)}>
      <Icon className="size-3" aria-hidden="true" />
      {config.label}
    </Badge>
  )
}
