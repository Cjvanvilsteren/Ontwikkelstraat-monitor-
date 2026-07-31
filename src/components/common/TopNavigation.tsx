import { Menu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface TopNavigationProps {
  onOpenMobileNav: () => void
}

export function TopNavigation({ onOpenMobileNav }: TopNavigationProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open navigatiemenu"
      >
        <Menu className="size-5" />
      </Button>
      <span className="text-sm font-semibold text-foreground">Environment Control Tower</span>
      <Badge variant="outline" className="ml-auto shrink-0">
        Prototype met fictieve data
      </Badge>
    </header>
  )
}
