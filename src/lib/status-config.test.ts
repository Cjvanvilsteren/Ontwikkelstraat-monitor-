import { describe, expect, it } from 'vitest'
import {
  ENVIRONMENT_STATUS_CONFIG,
  ISSUE_STATUS_CONFIG,
  RELEASE_STATUS_CONFIG,
  RISK_CONFIG,
} from '@/lib/status-config'
import { ENVIRONMENT_STATUSES, ISSUE_STATUSES, RELEASE_STATUSES, RISK_LEVELS } from '@/types'

describe('status-config', () => {
  it('maps every environment status to a badge variant and icon', () => {
    for (const status of ENVIRONMENT_STATUSES) {
      const config = ENVIRONMENT_STATUS_CONFIG[status]
      expect(config).toBeDefined()
      expect(config.label).toBeTruthy()
      expect(config.icon).toBeDefined()
    }
  })

  it('maps every release status to a badge variant and icon', () => {
    for (const status of RELEASE_STATUSES) {
      const config = RELEASE_STATUS_CONFIG[status]
      expect(config).toBeDefined()
      expect(config.label).toBeTruthy()
    }
  })

  it('maps risk levels to distinct variants so risk is not color-only', () => {
    for (const risk of RISK_LEVELS) {
      const config = RISK_CONFIG[risk]
      expect(config).toBeDefined()
      expect(config.icon).toBeDefined()
    }
    const variants = RISK_LEVELS.map((risk) => RISK_CONFIG[risk].variant)
    expect(new Set(variants).size).toBe(RISK_LEVELS.length)
  })

  it('flags incidents as the destructive variant', () => {
    expect(ENVIRONMENT_STATUS_CONFIG.Incident.variant).toBe('destructive')
    expect(ENVIRONMENT_STATUS_CONFIG.Healthy.variant).toBe('success')
  })

  it('maps every issue status to a badge variant and icon', () => {
    for (const status of ISSUE_STATUSES) {
      const config = ISSUE_STATUS_CONFIG[status]
      expect(config).toBeDefined()
      expect(config.label).toBeTruthy()
      expect(config.icon).toBeDefined()
    }
    expect(ISSUE_STATUS_CONFIG.Open.variant).toBe('destructive')
    expect(ISSUE_STATUS_CONFIG.Resolved.variant).toBe('success')
  })
})
