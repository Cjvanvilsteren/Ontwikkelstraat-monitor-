import { createHashRouter } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { EnvironmentsPage } from '@/pages/EnvironmentsPage'
import { ReleaseCalendarPage } from '@/pages/ReleaseCalendarPage'
import { IssuesPage } from '@/pages/IssuesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <EnvironmentsPage /> },
      { path: 'releases', element: <ReleaseCalendarPage /> },
      { path: 'issues', element: <IssuesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
