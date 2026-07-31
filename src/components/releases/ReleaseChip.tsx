import { ShieldAlert } from 'lucide-react'
import { RELEASE_STATUS_CONFIG, RELEASE_TYPE_CONFIG } from '@/lib/status-config'
import type { Release } from '@/types'
import { cn } from '@/lib/utils'

interface ReleaseChipProps {
  release: Release
  onClick: () => void
}

const STATUS_DOT_CLASSES: Record<string, string> = {
  Planned: 'bg-muted-foreground',
  'In Progress': 'bg-[color:var(--warning)]',
  Completed: 'bg-[color:var(--success)]',
  Delayed: 'bg-[color:var(--destructive)]',
  Cancelled: 'bg-muted-foreground',
}

export function ReleaseChip({ release, onClick }: ReleaseChipProps) {
  const typeConfig = RELEASE_TYPE_CONFIG[release.type]
  const TypeIcon = typeConfig.icon
  const statusConfig = RELEASE_STATUS_CONFIG[release.status]

  return (
    <button
      type="button"
      onClick={onClick}
      title={`${release.title} — ${statusConfig.label}`}
      className={cn(
        'flex w-full items-center gap-1.5 rounded-md border border-border bg-card px-1.5 py-1 text-left text-[11px] leading-tight transition-colors hover:bg-accent',
        release.status === 'Cancelled' && 'opacity-60 line-through',
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', STATUS_DOT_CLASSES[release.status])} aria-hidden="true" />
      <TypeIcon className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="truncate">{release.title}</span>
      {release.risk === 'High' && (
        <ShieldAlert className="ml-auto size-3 shrink-0 text-[color:var(--destructive)]" aria-hidden="true" />
      )}
    </button>
  )
}
