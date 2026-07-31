import { systems } from '@/data'
import type { Environment } from '@/types'

export function getSystemName(systemId: string): string {
  return systems.find((system) => system.id === systemId)?.name ?? 'Onbekend systeem'
}

export function findEnvironment(environments: Environment[], id: string | null | undefined) {
  if (!id) return undefined
  return environments.find((env) => env.id === id)
}
