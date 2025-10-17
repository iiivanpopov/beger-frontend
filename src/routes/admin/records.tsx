import { createFileRoute } from '@tanstack/react-router'
import { RecordsPage } from '@/pages/Records/RecordsPage'

export const Route = createFileRoute('/admin/records')({
  component: RecordsPage,
})
