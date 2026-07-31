import {
  AlertOctagon,
  Ban,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Flame,
  Minus,
  PlayCircle,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Siren,
  TriangleAlert,
  Truck,
  Rocket,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type {
  Criticality,
  EnvironmentStatus,
  IssueStatus,
  ReleaseStatus,
  ReleaseType,
  RiskLevel,
} from '@/types'
import type { badgeVariants } from '@/components/ui/badge'
import type { VariantProps } from 'class-variance-authority'

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

interface LevelConfig {
  label: string
  variant: BadgeVariant
  icon: LucideIcon
}

export const ENVIRONMENT_STATUS_CONFIG: Record<EnvironmentStatus, LevelConfig> = {
  Healthy: { label: 'Gezond', variant: 'success', icon: CheckCircle2 },
  Degraded: { label: 'Verminderd', variant: 'warning', icon: TriangleAlert },
  Maintenance: { label: 'Onderhoud', variant: 'info', icon: Wrench },
  Incident: { label: 'Verstoring', variant: 'destructive', icon: Siren },
}

export const CRITICALITY_CONFIG: Record<Criticality, LevelConfig> = {
  Low: { label: 'Laag', variant: 'muted', icon: Minus },
  Medium: { label: 'Gemiddeld', variant: 'warning', icon: CircleAlert },
  High: { label: 'Hoog', variant: 'destructive', icon: Flame },
}

export const RISK_CONFIG: Record<RiskLevel, LevelConfig> = {
  Low: { label: 'Laag risico', variant: 'success', icon: ShieldCheck },
  Medium: { label: 'Gemiddeld risico', variant: 'warning', icon: ShieldAlert },
  High: { label: 'Hoog risico', variant: 'destructive', icon: ShieldX },
}

export const RELEASE_STATUS_CONFIG: Record<ReleaseStatus, LevelConfig> = {
  Planned: { label: 'Gepland', variant: 'muted', icon: CalendarClock },
  'In Progress': { label: 'Bezig', variant: 'warning', icon: PlayCircle },
  Completed: { label: 'Afgerond', variant: 'success', icon: CheckCircle2 },
  Delayed: { label: 'Vertraagd', variant: 'destructive', icon: AlertOctagon },
  Cancelled: { label: 'Geannuleerd', variant: 'muted', icon: Ban },
}

export const RELEASE_TYPE_CONFIG: Record<ReleaseType, { label: string; icon: LucideIcon }> = {
  'Internal Release': { label: 'Interne release', icon: Rocket },
  'Supplier Release': { label: 'Leveranciersrelease', icon: Truck },
  Maintenance: { label: 'Onderhoud', icon: Wrench },
  'Security Update': { label: 'Beveiligingsupdate', icon: ShieldAlert },
}

export const ISSUE_STATUS_CONFIG: Record<IssueStatus, LevelConfig> = {
  Open: { label: 'Open', variant: 'destructive', icon: Siren },
  'In Progress': { label: 'Bezig', variant: 'warning', icon: PlayCircle },
  Resolved: { label: 'Opgelost', variant: 'success', icon: CheckCircle2 },
}
