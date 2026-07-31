import { format, formatDistanceToNow } from 'date-fns'
import { nl } from 'date-fns/locale'

export function formatDate(iso: string): string {
  return format(new Date(iso), 'd MMM yyyy', { locale: nl })
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), 'd MMM yyyy HH:mm', { locale: nl })
}

export function formatRelativeDate(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: nl })
}
