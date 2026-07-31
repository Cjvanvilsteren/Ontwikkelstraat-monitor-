import { eachDayOfInterval, endOfMonth, endOfWeek, isSameDay, startOfMonth, startOfWeek } from 'date-fns'
import type { Release } from '@/types'

export function getMonthGrid(monthDate: Date): Date[] {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

export function releasesForDay(releases: Release[], day: Date): Release[] {
  return releases
    .filter((release) => isSameDay(new Date(release.startAt), day))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
}
