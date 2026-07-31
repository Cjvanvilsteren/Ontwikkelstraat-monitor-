import { useState } from 'react'
import { CalendarDays, List } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ReleaseCalendar } from '@/components/releases/ReleaseCalendar'
import { ReleaseSprintList } from '@/components/releases/ReleaseSprintList'
import { StatusBadge } from '@/components/common/StatusBadge'
import { RiskBadge } from '@/components/common/RiskBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RELEASE_TYPE_CONFIG } from '@/lib/status-config'
import { getSystemName } from '@/lib/lookups'
import { formatDateTime } from '@/utils/format'
import { environments, releases } from '@/data'

type ViewMode = 'calendar' | 'list'

export function ReleaseCalendarPage() {
  const [view, setView] = useState<ViewMode>('list')
  const [anchorDate, setAnchorDate] = useState(new Date())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedRelease = selectedId ? releases.find((r) => r.id === selectedId) ?? null : null
  const typeConfig = selectedRelease ? RELEASE_TYPE_CONFIG[selectedRelease.type] : null
  const TypeIcon = typeConfig?.icon

  const affectedEnvironments = selectedRelease
    ? environments.filter((env) => selectedRelease.environmentIds.includes(env.id))
    : []

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Releasekalender"
        description="Interne releases, leveranciersreleases en onderhoudsmomenten."
        actions={
          <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
            <Button
              variant={view === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={view === 'calendar'}
              onClick={() => setView('calendar')}
            >
              <CalendarDays className="size-4" /> Kalender
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <List className="size-4" /> Lijst per sprint
            </Button>
          </div>
        }
      />

      {view === 'calendar' ? (
        <ReleaseCalendar
          anchorDate={anchorDate}
          onAnchorDateChange={setAnchorDate}
          releases={releases}
          onSelectRelease={setSelectedId}
        />
      ) : (
        <ReleaseSprintList releases={releases} onSelectRelease={setSelectedId} />
      )}

      <Dialog open={!!selectedRelease} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent>
          {selectedRelease && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {TypeIcon && <TypeIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                  {selectedRelease.title}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusBadge status={selectedRelease.status} />
                <RiskBadge risk={selectedRelease.risk} />
              </div>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="text-right font-medium">{selectedRelease.type}</dd>
                <dt className="text-muted-foreground">Systeem</dt>
                <dd className="text-right font-medium">{getSystemName(selectedRelease.systemId)}</dd>
                <dt className="text-muted-foreground">Datum en tijd</dt>
                <dd className="text-right font-medium">{formatDateTime(selectedRelease.startAt)}</dd>
              </dl>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Getroffen omgevingen
                </span>
                {affectedEnvironments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Geen gekoppelde omgevingen.</p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {affectedEnvironments.map((env) => (
                      <li key={env.id} className="text-sm text-foreground">
                        {env.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
