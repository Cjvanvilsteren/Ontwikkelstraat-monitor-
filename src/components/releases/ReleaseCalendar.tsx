import { addMonths, format, isSameMonth, isToday } from 'date-fns'
import { nl } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReleaseChip } from '@/components/releases/ReleaseChip'
import { getMonthGrid, releasesForDay } from '@/lib/calendar'
import type { Release } from '@/types'
import { cn } from '@/lib/utils'

const WEEKDAY_LABELS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
const MAX_CHIPS_PER_DAY = 3

interface ReleaseCalendarProps {
  anchorDate: Date
  onAnchorDateChange: (date: Date) => void
  releases: Release[]
  onSelectRelease: (id: string) => void
}

export function ReleaseCalendar({
  anchorDate,
  onAnchorDateChange,
  releases,
  onSelectRelease,
}: ReleaseCalendarProps) {
  const goToday = () => onAnchorDateChange(new Date())
  const goPrev = () => onAnchorDateChange(addMonths(anchorDate, -1))
  const goNext = () => onAnchorDateChange(addMonths(anchorDate, 1))

  const days = getMonthGrid(anchorDate)

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold capitalize text-foreground">
          {format(anchorDate, 'MMMM yyyy', { locale: nl })}
        </h2>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={goToday}>
            Vandaag
          </Button>
          <Button variant="ghost" size="icon" onClick={goPrev} aria-label="Vorige maand">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goNext} aria-label="Volgende maand">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border text-xs">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground">
            {label}
          </div>
        ))}
        {days.map((day) => {
          const dayReleases = releasesForDay(releases, day)
          const visible = dayReleases.slice(0, MAX_CHIPS_PER_DAY)
          const overflow = dayReleases.length - visible.length
          const dimmed = !isSameMonth(day, anchorDate)

          return (
            <div key={day.toISOString()} className={cn('flex min-h-24 flex-col gap-1 bg-card p-1.5', dimmed && 'bg-muted/40')}>
              <span
                className={cn(
                  'inline-flex size-5 items-center justify-center self-end rounded-full text-[11px] font-medium',
                  isToday(day) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                  dimmed && 'opacity-50',
                )}
              >
                {format(day, 'd')}
              </span>
              <div className="flex flex-col gap-1">
                {visible.map((release) => (
                  <ReleaseChip key={release.id} release={release} onClick={() => onSelectRelease(release.id)} />
                ))}
                {overflow > 0 && (
                  <span className="px-1 text-[11px] text-muted-foreground">+{overflow} meer</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
