import { PageHeader } from '@/components/common/PageHeader'
import { EnvironmentTable } from '@/components/environments/EnvironmentTable'
import { environments, supplierComponents } from '@/data'
import { ENVIRONMENT_STAGES } from '@/types'

export function EnvironmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Omgevingen"
        description="Alle software-omgevingen, per fase gegroepeerd, inclusief de status van leveranciersonderdelen (bijv. een payment API) per omgeving."
      />

      {ENVIRONMENT_STAGES.map((stage) => {
        const stageEnvironments = environments.filter((env) => env.stage === stage)
        return (
          <div key={stage} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">{stage}</h2>
            <EnvironmentTable
              environments={stageEnvironments}
              showStage={false}
              supplierComponents={supplierComponents}
            />
          </div>
        )
      })}
    </div>
  )
}
