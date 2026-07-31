import { describe, expect, it } from 'vitest'
import { environments, issues, releases, supplierComponents, systems } from '@/data'

describe('mockdata integrity', () => {
  it('every environment references an existing system', () => {
    const systemIds = new Set(systems.map((s) => s.id))
    for (const env of environments) {
      expect(systemIds.has(env.systemId)).toBe(true)
    }
  })

  it('every release environmentId references an existing environment', () => {
    const environmentIds = new Set(environments.map((e) => e.id))
    for (const release of releases) {
      for (const id of release.environmentIds) {
        expect(environmentIds.has(id)).toBe(true)
      }
    }
  })

  it('every issue environmentId references an existing environment', () => {
    const environmentIds = new Set(environments.map((e) => e.id))
    for (const issue of issues) {
      expect(environmentIds.has(issue.environmentId)).toBe(true)
    }
  })

  it('every supplier component environmentId references an existing environment', () => {
    const environmentIds = new Set(environments.map((e) => e.id))
    for (const component of supplierComponents) {
      expect(environmentIds.has(component.environmentId)).toBe(true)
    }
  })

  it('has four stages for every system', () => {
    for (const system of systems) {
      const stagesForSystem = environments.filter((env) => env.systemId === system.id)
      expect(stagesForSystem).toHaveLength(4)
    }
  })
})
