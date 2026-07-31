import type { Criticality } from './environment'

export type IssueStatus = 'Open' | 'In Progress' | 'Resolved'

export interface Issue {
  id: string
  title: string
  environmentId: string
  status: IssueStatus
  severity: Criticality
  reportedAt: string
  description: string
}

export const ISSUE_STATUSES: IssueStatus[] = ['Open', 'In Progress', 'Resolved']
