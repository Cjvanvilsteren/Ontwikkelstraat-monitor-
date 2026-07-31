import { Fragment } from 'react'
import { CornerDownRight, Server } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { CriticalityBadge } from '@/components/common/CriticalityBadge'
import { EmptyState } from '@/components/common/EmptyState'
import type { Environment, SupplierComponent } from '@/types'
import { getSystemName } from '@/lib/lookups'

interface EnvironmentTableProps {
  environments: Environment[]
  showStage?: boolean
  supplierComponents?: SupplierComponent[]
}

export function EnvironmentTable({
  environments,
  showStage = true,
  supplierComponents = [],
}: EnvironmentTableProps) {
  if (environments.length === 0) {
    return <EmptyState icon={Server} title="Geen omgevingen gevonden" />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              {showStage ? 'Naam' : 'Systeem'}
            </th>
            {showStage && (
              <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Fase
              </th>
            )}
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              Status
            </th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              Verantwoordelijke
            </th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              Kritikaliteit
            </th>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              Versie
            </th>
          </tr>
        </thead>
        <tbody>
          {environments.map((env) => {
            const components = supplierComponents.filter((c) => c.environmentId === env.id)
            return (
              <Fragment key={env.id}>
                <tr className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-3 py-2.5 font-medium text-foreground">
                    {showStage ? env.name : getSystemName(env.systemId)}
                  </td>
                  {showStage && <td className="px-3 py-2.5 text-muted-foreground">{env.stage}</td>}
                  <td className="px-3 py-2.5">
                    <StatusBadge status={env.status} />
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{env.responsible}</td>
                  <td className="px-3 py-2.5">
                    <CriticalityBadge criticality={env.criticality} />
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{env.version}</td>
                </tr>
                {components.map((component) => (
                  <tr key={component.id} className="border-b border-border bg-muted/30 last:border-0">
                    <td className="px-3 py-2 pl-7 text-muted-foreground" colSpan={showStage ? 2 : 1}>
                      <span className="inline-flex items-center gap-1.5">
                        <CornerDownRight className="size-3.5 shrink-0" aria-hidden="true" />
                        {component.name}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={component.status} />
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{component.supplierName}</td>
                    <td className="px-3 py-2 text-muted-foreground" colSpan={2}>
                      –
                    </td>
                  </tr>
                ))}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
