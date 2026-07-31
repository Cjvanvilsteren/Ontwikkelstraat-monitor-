import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore, type NewIssueInput } from '@/store/useAppStore'
import { issues } from '@/data/issues'

const STORAGE_KEY = 'environment-control-tower-issues'

function buildIssueInput(overrides: Partial<NewIssueInput> = {}): NewIssueInput {
  return {
    title: 'Test issue',
    environmentId: 'env-01',
    status: 'Open',
    severity: 'Medium',
    description: 'Testomschrijving.',
    ...overrides,
  }
}

beforeEach(() => {
  window.localStorage.clear()
  useAppStore.setState({ issues: issues.map((issue) => ({ ...issue })) })
})

describe('useAppStore', () => {
  it('adds a new issue with a generated id and reportedAt timestamp', () => {
    const before = useAppStore.getState().issues.length
    const id = useAppStore.getState().addIssue(buildIssueInput())

    const state = useAppStore.getState()
    expect(state.issues).toHaveLength(before + 1)
    const created = state.issues.find((issue) => issue.id === id)
    expect(created).toBeDefined()
    expect(created?.reportedAt).toBeTruthy()
  })

  it('updates an existing issue', () => {
    const target = useAppStore.getState().issues[0]
    useAppStore.getState().updateIssue(target.id, { status: 'Resolved' })

    const updated = useAppStore.getState().issues.find((issue) => issue.id === target.id)
    expect(updated?.status).toBe('Resolved')
  })

  it('deletes an issue', () => {
    const target = useAppStore.getState().issues[0]
    useAppStore.getState().deleteIssue(target.id)

    expect(useAppStore.getState().issues.find((issue) => issue.id === target.id)).toBeUndefined()
  })

  it('persists issue changes to localStorage', () => {
    useAppStore.getState().addIssue(buildIssueInput({ title: 'Persisted issue' }))

    const raw = window.localStorage.getItem(STORAGE_KEY)
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(raw!)
    expect(parsed.state.issues.some((issue: { title: string }) => issue.title === 'Persisted issue')).toBe(
      true,
    )
  })
})
