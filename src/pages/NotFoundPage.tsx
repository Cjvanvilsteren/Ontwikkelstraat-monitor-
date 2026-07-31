import { Link } from 'react-router-dom'
import { CompassIcon } from 'lucide-react'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <EmptyState
      icon={CompassIcon}
      title="Pagina niet gevonden"
      description="Deze pagina bestaat niet binnen dit prototype."
      action={
        <Button asChild size="sm">
          <Link to="/">Naar overzicht</Link>
        </Button>
      }
    />
  )
}
