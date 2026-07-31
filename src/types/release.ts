export type ReleaseType = 'Internal Release' | 'Supplier Release' | 'Maintenance' | 'Security Update'

export type ReleaseStatus = 'Planned' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled'

export type RiskLevel = 'Low' | 'Medium' | 'High'

export interface Release {
  id: string
  title: string
  type: ReleaseType
  systemId: string
  environmentIds: string[]
  startAt: string
  status: ReleaseStatus
  risk: RiskLevel
}

export const RELEASE_TYPES: ReleaseType[] = [
  'Internal Release',
  'Supplier Release',
  'Maintenance',
  'Security Update',
]

export const RELEASE_STATUSES: ReleaseStatus[] = [
  'Planned',
  'In Progress',
  'Completed',
  'Delayed',
  'Cancelled',
]

export const RISK_LEVELS: RiskLevel[] = ['Low', 'Medium', 'High']
