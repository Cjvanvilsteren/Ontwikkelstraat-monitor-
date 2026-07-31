import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { IssueTable } from '@/components/issues/IssueTable'
import { IssueForm } from '@/components/issues/IssueForm'
import { useAppStore } from '@/store/useAppStore'
import { environments } from '@/data'

export function IssuesPage() {
  const issues = useAppStore((s) => s.issues)
  const addIssue = useAppStore((s) => s.addIssue)
  const updateIssue = useAppStore((s) => s.updateIssue)
  const deleteIssue = useAppStore((s) => s.deleteIssue)

  const [formState, setFormState] = useState<{ mode: 'create' | 'edit'; id?: string } | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const editingIssue = formState?.mode === 'edit' ? issues.find((i) => i.id === formState.id) : undefined
  const sortedIssues = [...issues].sort(
    (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime(),
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Issues"
        description="Actuele en opgeloste issues per omgeving."
        actions={
          <Button size="sm" onClick={() => setFormState({ mode: 'create' })}>
            <Plus className="size-4" /> Issue toevoegen
          </Button>
        }
      />

      <IssueTable
        issues={sortedIssues}
        environments={environments}
        onEdit={(id) => setFormState({ mode: 'edit', id })}
        onDelete={(id) => setDeleteId(id)}
      />

      <IssueForm
        open={!!formState}
        onOpenChange={(open) => !open && setFormState(null)}
        issue={editingIssue}
        onSubmit={(data) => {
          if (formState?.mode === 'edit' && formState.id) {
            updateIssue(formState.id, data)
          } else {
            addIssue(data)
          }
        }}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Issue verwijderen"
        description="Weet je zeker dat je dit issue wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
        confirmLabel="Verwijderen"
        onConfirm={() => {
          if (deleteId) deleteIssue(deleteId)
        }}
      />
    </div>
  )
}
