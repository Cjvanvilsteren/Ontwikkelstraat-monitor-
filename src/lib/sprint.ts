import { addDays, differenceInCalendarDays, format, startOfWeek, subDays } from 'date-fns'
import { nl } from 'date-fns/locale'
import type { Release } from '@/types'

const SPRINT_LENGTH_DAYS = 14

// Ankerdatum (een maandag) waar sprintnummering vanaf telt: twee sprints terug
// vanaf vandaag, zodat de huidige en aankomende releases in lage, herkenbare
// sprintnummers vallen in plaats van een willekeurig groot getal.
const SPRINT_ANCHOR = startOfWeek(subDays(new Date(), SPRINT_LENGTH_DAYS * 2), { weekStartsOn: 1 })

export interface Sprint {
  number: number
  start: Date
  end: Date
  label: string
}

export function getSprintForDate(date: Date): Sprint {
  const daysSinceAnchor = differenceInCalendarDays(date, SPRINT_ANCHOR)
  const sprintIndex = Math.floor(daysSinceAnchor / SPRINT_LENGTH_DAYS)
  const start = addDays(SPRINT_ANCHOR, sprintIndex * SPRINT_LENGTH_DAYS)
  const end = addDays(start, SPRINT_LENGTH_DAYS - 1)
  return {
    number: sprintIndex + 1,
    start,
    end,
    label: `Sprint ${sprintIndex + 1} · ${format(start, 'd MMM', { locale: nl })} – ${format(end, 'd MMM', { locale: nl })}`,
  }
}

export interface SprintGroup {
  sprint: Sprint
  releases: Release[]
}

export function groupReleasesBySprint(releases: Release[]): SprintGroup[] {
  const groups = new Map<number, SprintGroup>()

  for (const release of releases) {
    const sprint = getSprintForDate(new Date(release.startAt))
    const existing = groups.get(sprint.number)
    if (existing) {
      existing.releases.push(release)
    } else {
      groups.set(sprint.number, { sprint, releases: [release] })
    }
  }

  return [...groups.values()]
    .sort((a, b) => a.sprint.number - b.sprint.number)
    .map((group) => ({
      sprint: group.sprint,
      releases: [...group.releases].sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      ),
    }))
}
