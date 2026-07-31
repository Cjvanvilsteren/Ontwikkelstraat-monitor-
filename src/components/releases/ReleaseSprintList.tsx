import { CalendarX, ShieldAlert } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { RiskBadge } from '@/components/common/RiskBadge'
import { EmptyState } from '@/components/common/EmptyState'
import { RELEASE_TYPE_CONFIG } from '@/lib/status-config'
import { getSystemName } from '@/lib/lookups'
import { groupReleasesBySprint } from '@/lib/sprint'
import { formatDate } from '@/utils/format'
import type { Release } from '@/types'

interface ReleaseSprintListProps {
  releases: Release[]
  onSelectRelease: (id: string) => void
}

export function ReleaseSprintList({ releases, onSelectRelease }: ReleaseSprintListProps) {
  if (releases.length === 0) {
    return <EmptyState icon={CalendarX} title="Geen releases gevonden" />
  }

  const sprintGroups = groupReleasesBySprint(releases)

  return (
    <div className="flex flex-col gap-6">
      {sprintGroups.map(({ sprint, releases: sprintReleases }) => (
        <div key={sprint.number} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-foreground">{sprint.label}</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Onderdeel
                  </th>
                  <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Release
                  </th>
                  <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Datum
                  </th>
                  <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Risico
                  </th>
                </tr>
              </thead>
              <tbody>
                {sprintReleases.map((release) => {
                  const typeConfig = RELEASE_TYPE_CONFIG[release.type]
                  const TypeIcon = typeConfig.icon
                  return (
                    <tr key={release.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                      <td className="px-3 py-2.5 text-muted-foreground">{getSystemName(release.systemId)}</td>
                      <td className="px-3 py-2.5">
                        <button
                          type="button"
                          onClick={() => onSelectRelease(release.id)}
                          className="flex items-center gap-1.5 text-left font-medium text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          <TypeIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                          {release.title}
                          {release.risk === 'High' && (
                            <ShieldAlert
                              className="size-3.5 shrink-0 text-[color:var(--destructive)]"
                              aria-label="Hoog risico"
                            />
                          )}
                        </button>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">{formatDate(release.startAt)}</td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={release.status} />
                      </td>
                      <td className="px-3 py-2.5">
                        <RiskBadge risk={release.risk} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
