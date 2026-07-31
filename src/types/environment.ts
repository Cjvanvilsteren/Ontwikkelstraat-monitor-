export type EnvironmentStage = 'Dev' | 'Test' | 'Acceptatie' | 'Productie'

export type EnvironmentStatus = 'Healthy' | 'Degraded' | 'Maintenance' | 'Incident'

export type Criticality = 'Low' | 'Medium' | 'High'

export interface Environment {
  id: string
  name: string
  stage: EnvironmentStage
  status: EnvironmentStatus
  systemId: string
  responsible: string
  criticality: Criticality
  version: string
}

export const ENVIRONMENT_STAGES: EnvironmentStage[] = ['Dev', 'Test', 'Acceptatie', 'Productie']

export const ENVIRONMENT_STATUSES: EnvironmentStatus[] = [
  'Healthy',
  'Degraded',
  'Maintenance',
  'Incident',
]

export const CRITICALITY_LEVELS: Criticality[] = ['Low', 'Medium', 'High']
