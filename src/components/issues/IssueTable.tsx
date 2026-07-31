import { Pencil, Siren, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { CriticalityBadge } from '@/components/common/CriticalityBadge'
import { EmptyState } from '@/components/common/EmptyState'
import type { Environment, Issue } from '@/types'
import { findEnvironment } from '@/lib/lookups'
import { formatRelativeDate } from '@/utils/format'

interface IssueTableProps {
  issues: Issue[]
  environments: Environment[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function IssueTable({ issues, environments, onEdit, onDelete }: IssueTableProps) {
  if (issues.length === 0) {
    return <EmptyState icon={Siren} title="Geen issues gevonden" />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Titel</th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Omgeving</th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Ernst</th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Gemeld</th>
            <th scope="col" className="px-3 py-2.5 text-right text-xs font-medium text-muted-foreground">Acties</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-accent/40">
              <td className="px-3 py-2.5 font-medium text-foreground">{issue.title}</td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {findEnvironment(environments, issue.environmentId)?.name ?? 'Onbekende omgeving'}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge status={issue.status} />
              </td>
              <td className="px-3 py-2.5">
                <CriticalityBadge criticality={issue.severity} />
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">{formatRelativeDate(issue.reportedAt)}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(issue.id)} aria-label={`Bewerk ${issue.title}`}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(issue.id)}
                    aria-label={`Verwijder ${issue.title}`}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
