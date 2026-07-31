import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Issue } from '@/types'
import { issues as seedIssues } from '@/data'

const STORAGE_KEY = 'environment-control-tower-issues'

function generateId(): string {
  return `issue-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export type NewIssueInput = Omit<Issue, 'id' | 'reportedAt'>

interface AppState {
  issues: Issue[]
  addIssue: (input: NewIssueInput) => string
  updateIssue: (id: string, patch: Partial<Issue>) => void
  deleteIssue: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      issues: seedIssues.map((issue) => ({ ...issue })),

      addIssue: (input) => {
        const id = generateId()
        const issue: Issue = { ...input, id, reportedAt: new Date().toISOString() }
        set((state) => ({ issues: [...state.issues, issue] }))
        return id
      },

      updateIssue: (id, patch) => {
        set((state) => ({
          issues: state.issues.map((issue) => (issue.id === id ? { ...issue, ...patch } : issue)),
        }))
      },

      deleteIssue: (id) => {
        set((state) => ({ issues: state.issues.filter((issue) => issue.id !== id) }))
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ issues: state.issues }),
    },
  ),
)
