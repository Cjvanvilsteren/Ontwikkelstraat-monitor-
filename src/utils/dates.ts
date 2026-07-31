import { addDays, setHours, setMinutes, startOfDay } from 'date-fns'

/** Returns an ISO timestamp `offsetDays` from today at the given local time, anchored to app start-of-day. */
export function atDay(offsetDays: number, hour = 9, minute = 0): string {
  const base = setMinutes(setHours(startOfDay(new Date()), hour), minute)
  return addDays(base, offsetDays).toISOString()
}
