import { NavLink } from 'react-router-dom'
import { CalendarRange, Server, Siren, TowerControl } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Omgevingen', icon: Server, end: true },
  { to: '/releases', label: 'Releasekalender', icon: CalendarRange, end: false },
  { to: '/issues', label: 'Issues', icon: Siren, end: false },
]

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="flex h-full w-64 flex-col gap-1 bg-sidebar px-3 py-4 text-sidebar-foreground"
    >
      <div className="mb-4 flex items-center gap-2 px-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-accent">
          <TowerControl className="size-4 text-sidebar-accent-foreground" aria-hidden="true" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">Control Tower</span>
          <span className="text-[11px] text-sidebar-muted">Environment overview</span>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                )
              }
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="border-t border-sidebar-border px-2 pt-3 text-[11px] text-sidebar-muted">
        Prototype met fictieve data
      </div>
    </nav>
  )
}
