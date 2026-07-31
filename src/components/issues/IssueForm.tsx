import { useEffect, useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { environments } from '@/data'
import { CRITICALITY_LEVELS, ISSUE_STATUSES, type Issue } from '@/types'
import type { NewIssueInput } from '@/store/useAppStore'

interface IssueFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  issue?: Issue
  onSubmit: (data: NewIssueInput) => void
}

function buildDefaults(): NewIssueInput {
  return {
    title: '',
    environmentId: environments[0]?.id ?? '',
    status: 'Open',
    severity: 'Medium',
    description: '',
  }
}

export function IssueForm({ open, onOpenChange, issue, onSubmit }: IssueFormProps) {
  const [form, setForm] = useState<NewIssueInput>(buildDefaults())

  useEffect(() => {
    if (open) {
      setForm(issue ? { ...issue } : buildDefaults())
    }
  }, [open, issue])

  const isEdit = !!issue

  function update<K extends keyof NewIssueInput>(key: K, value: NewIssueInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Issue bewerken' : 'Issue toevoegen'}</DialogTitle>
          <DialogDescription>
            Alle gegevens zijn fictief en worden alleen lokaal opgeslagen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="issue-title">Titel</Label>
            <Input
              id="issue-title"
              required
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="issue-environment">Omgeving</Label>
            <Select value={form.environmentId} onValueChange={(v) => update('environmentId', v)}>
              <SelectTrigger id="issue-environment"><SelectValue /></SelectTrigger>
              <SelectContent>
                {environments.map((env) => (
                  <SelectItem key={env.id} value={env.id}>{env.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="issue-status">Status</Label>
              <Select value={form.status} onValueChange={(v) => update('status', v as Issue['status'])}>
                <SelectTrigger id="issue-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ISSUE_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="issue-severity">Ernst</Label>
              <Select value={form.severity} onValueChange={(v) => update('severity', v as Issue['severity'])}>
                <SelectTrigger id="issue-severity"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CRITICALITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="issue-description">Omschrijving</Label>
            <Textarea
              id="issue-description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit">{isEdit ? 'Wijzigingen opslaan' : 'Issue toevoegen'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
