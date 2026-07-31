import type { EnvironmentStatus } from './environment'

export interface SupplierComponent {
  id: string
  name: string
  supplierName: string
  environmentId: string
  status: EnvironmentStatus
}
